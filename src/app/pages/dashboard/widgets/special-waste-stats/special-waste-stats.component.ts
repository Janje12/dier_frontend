import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Transaction } from '../../../../@core/data/transaction';
import { TransactionsService } from '../../../../@core/service/transactions.service';
import { SPECIAL_WASTE_STATS_SETTINGS } from './special-waste-stats.settings';

@Component({
  selector: 'widget-special-waste-stats',
  templateUrl: './special-waste-stats.component.html',
  styleUrls: ['./special-waste-stats.component.css'],
})
export class SpecialWasteStatsComponent implements OnInit {
  @Output() isLoaded: EventEmitter<boolean> = new EventEmitter<boolean>();

  options = SPECIAL_WASTE_STATS_SETTINGS;
  specialWasteList: Transaction[] = [];
  selectedSpecialWaste: Transaction;
  specialWaste: Transaction[] = [];
  daysInMonth: number = 30;

  constructor(private transactionService: TransactionsService) {
    const d = new Date();
    this.daysInMonth = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
  }

  ngOnInit(): void {
    this.transactionService.getMostUsedSpecialWaste().subscribe(x => {
      this.specialWasteList = x;
      if (x.length === 0) {
        this.isLoaded.emit();
        return;
      }
      this.selectedSpecialWaste = this.specialWasteList[0];
      this.updateGraph();
    });
  }

  chooseTransaction(trash: Transaction) {
    this.selectedSpecialWaste = trash;
    this.updateGraph();
  }

  updateGraph() {
    this.transactionService.getTransactions(this.selectedSpecialWaste.specialWaste._id,
      'specialWaste').subscribe(t => {
      this.specialWaste = t;

      const days = Array.from({length: this.daysInMonth}, (_, i) => i + 1);
      const data1 = Array<number>(this.daysInMonth).fill(0);
      const data2 = Array<number>(this.daysInMonth).fill(0);
      const data3 = Array<number>(this.daysInMonth).fill(0);

      for (let i = 0; i < this.specialWaste.length; i++) {
        let dayNumber = '-';
        if (this.specialWaste[i].date.toString().substring(8, 10).charAt(0) !== '0') {
          dayNumber = this.specialWaste[i].date.toString().substring(8, 10);
        } else {
          dayNumber = this.specialWaste[i].date.toString().substring(9, 10);
        }
        if (this.specialWaste[i].specialWasteType === 'production')
          data1[dayNumber] += this.specialWaste[i].trashAmount;
        else if (this.specialWaste[i].specialWasteType === 'import')
          data2[dayNumber] += this.specialWaste[i].trashAmount;
        else if (this.specialWaste[i].specialWasteType === 'export')
          data3[dayNumber] += Math.abs(this.specialWaste[i].trashAmount);
      }

      this.options.title.text = this.specialWaste[0].specialWaste.name;
      this.options.legend.data = ['Proizveden otpad', 'Uvezen otpad', 'Izvezen otpad'];
      this.options.xAxis.data = [...days];
      this.options.series[0].name = 'Proizveden otpad';
      this.options.series[0].data = [...data1];
      this.options.series[1].name = 'Uvezen otpad';
      this.options.series[1].data = [...data2];
      this.options.series[2].name = 'Izvezen otpad';
      this.options.series[2].data = [...data3];
      this.isLoaded.emit();
    });
  }

}
