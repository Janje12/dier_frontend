import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Transaction } from '../../../../@core/data/transaction';
import { TransactionsService } from '../../../../@core/service/transactions.service';
import { TRASH_STATS_SETTINGS } from '../trash-stats/trash-stats.settings';
import { SPECIAL_WASTE_STATS_SETTINGS } from './special-waste-stats.settings';

@Component({
  selector: 'widget-special-waste-stats',
  templateUrl: './special-waste-stats.component.html',
  styleUrls: ['./special-waste-stats.component.css'],
})
export class SpecialWasteStatsComponent implements OnChanges {
  @Input() size: string;

  options = SPECIAL_WASTE_STATS_SETTINGS;
  specialWasteList: Transaction[] = [];
  selectedSpecialWaste: Transaction;
  specialWaste: Transaction[] = [];
  data: { name: string, series: { name: string, value: number }[] }[];
  daysInMonth: number = 30;
  colorScheme = {
    domain: ['#FF0000', '#0000FF', '#00FF00'],
  };

  constructor(private transactionService: TransactionsService) {
    const d = new Date();
    this.options = Object.assign({}, SPECIAL_WASTE_STATS_SETTINGS);
    this.updateSize(this.size);
    this.daysInMonth = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['size']) {
      this.updateSize(this.size);
    }
    this.transactionService.getMostUsedSpecialWaste().subscribe(x => {
      this.specialWasteList = x;
      if (x.length === 0) {
        return;
      }
      this.selectedSpecialWaste = this.specialWasteList[0];
      this.updateGraph(this.selectedSpecialWaste);
    });
  }

  chooseTransaction(specialWaste: Transaction) {
    this.updateGraph(specialWaste);
  }

  updateGraph(specialWaste: Transaction) {
    this.transactionService.getTransactions(specialWaste.specialWaste._id,
      'specialWaste').subscribe(t => {
      this.specialWaste = t;
      this.options.legendTitle = this.specialWaste[0].specialWaste.desc;
      const data1 = {name: 'Proizveden', value: 0};
      const data2 = {name: 'Uvezeno', value: 0};
      const data3 = {name: 'Izvezeno', value: 0};
      this.data = [];
      for (let i = 0; i < this.daysInMonth; i++) {
        this.data[i] = {name: (i + 1) + '', series: []};
      }

      for (let i = 0; i < this.specialWaste.length; i++) {
        let dayNumber = '-';
        if (this.specialWaste[i].date.toString().substring(8, 10).charAt(0) !== '0') {
          dayNumber = this.specialWaste[i].date.toString().substring(8, 10);
        } else {
          dayNumber = this.specialWaste[i].date.toString().substring(9, 10);
        }
        if (this.specialWaste[i].specialWasteType === 'production') {
          data1.value += this.specialWaste[i].trashAmount;
          this.data[dayNumber].series.push({name: 'Proziveden', value: this.specialWaste[i].trashAmount})
        } else if (this.specialWaste[i].specialWasteType === 'import') {
          data2.value += this.specialWaste[i].trashAmount;
          this.data[dayNumber].series.push({name: 'Uvezeno', value: this.specialWaste[i].trashAmount})
        } else if (this.specialWaste[i].specialWasteType === 'export') {
          data3.value += this.specialWaste[i].trashAmount;
          this.data[dayNumber].series.push({name: 'Izvezeno', value: this.specialWaste[i].trashAmount})
        }
      }
    });
  }

  updateSize(size: String) {
    if (size === 'tiny')
      this.options.view = [];
    if (size === 'small')
      this.options.view = [];
    if (size === 'medium')
      this.options.view = [500, 300];
    if (size === 'large')
      this.options.view = [700, 300];
    if (size === 'giant')
      this.options.view = [1100, 500];
  }


}
