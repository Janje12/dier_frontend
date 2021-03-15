import { Component, OnInit, ViewChild } from '@angular/core';
import { Transaction } from '../../../../@core/data/transaction';
import { TransactionsService } from '../../../../@core/service/transactions.service';
import { SPECIAL_WASTE_STATS_SETTINGS } from './special-waste-stats.settings';

@Component({
  selector: 'widget-special-waste-stats',
  templateUrl: './special-waste-stats.component.html',
  styleUrls: ['./special-waste-stats.component.css'],
})
export class SpecialWasteStatsComponent implements OnInit {


  options = SPECIAL_WASTE_STATS_SETTINGS;
  specialWasteList: Transaction[] = [];
  selectedSpecialWaste: Transaction;
  specialWaste: Transaction[] = [];
  data: { name: string, series: {name: string, value: number}[] }[];
  daysInMonth: number = 30;

  constructor(private transactionService: TransactionsService) {
    const d = new Date();
    this.daysInMonth = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
    this.transactionService.getMostUsedSpecialWaste().subscribe(x => {
      this.specialWasteList = x;
      if (x.length === 0) {
        return;
      }
      this.selectedSpecialWaste = this.specialWasteList[0];
      this.transactionService.getTransactions(this.selectedSpecialWaste.specialWaste._id,
        'specialWaste').subscribe(t => {
        this.specialWaste = t;
        const data1 = new Array<{ name: string, value: number }>(this.daysInMonth);
        const data2 = new Array<{ name: string, value: number }>(this.daysInMonth);
        const data3 = new Array<{ name: string, value: number }>(this.daysInMonth);
        for (let i = 0; i < this.daysInMonth; i++) {
          data1[i] = {name: i + '', value: 0};
          data2[i] = {name: i + '', value: 0};
          data3[i] = {name: i + '', value: 0};
        }
        for (let i = 0; i < this.specialWaste.length; i++) {
          let dayNumber = '-';
          if (this.specialWaste[i].date.toString().substring(8, 10).charAt(0) !== '0') {
            dayNumber = this.specialWaste[i].date.toString().substring(8, 10);
          } else {
            dayNumber = this.specialWaste[i].date.toString().substring(9, 10);
          }
          if (this.specialWaste[i].specialWasteType === 'production') {
            data1[dayNumber]['value'] += this.specialWaste[i].trashAmount;
          } else if (this.specialWaste[i].specialWasteType === 'import') {
            data2[dayNumber]['value'] += this.specialWaste[i].trashAmount;
          } else if (this.specialWaste[i].specialWasteType === 'export') {
            data3[dayNumber]['value'] += this.specialWaste[i].trashAmount;
          }
          this.data = [];
          this.data[0] = {name: 'Proizveden', series: []};
          this.data[0].series = data1;
          this.data[1] = {name: 'Uvezen', series: []};
          this.data[1].series = data2;
          this.data[2] = {name: 'Izvezen', series: []};
          this.data[2].series = data3;
          console.log(this.data);
        }

      });
    });

  }

  ngOnInit(): void {

  }


  chooseTransaction(specialWaste: Transaction) {
    this.selectedSpecialWaste = specialWaste;
    this.updateGraph();
  }

  updateGraph() {

  }

}
