import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { BarVerticalComponent } from '@swimlane/ngx-charts';
import { Transaction } from '../../../../@core/data/transaction';
import { TransactionsService } from '../../../../@core/service/transactions.service';
import { TRASH_STATS_SETTINGS } from './trash-stats.settings';

@Component({
  selector: 'widget-trash-stats',
  templateUrl: './trash-stats.component.html',
  styleUrls: ['./trash-stats.component.css'],
})
export class TrashStatsComponent implements OnChanges {
  @Input() type: string;
  @Input() size: string;

  trash: Transaction[];
  options: any;
  trashList: Transaction[] = [];
  selectedTrash: Transaction;
  daysInMonth: number = 30;
  data: any[] = [];
  colorScheme = {
    domain: ['#FF0000', '#0000FF'],
  };

  constructor(private transactionService: TransactionsService) {
    const d = new Date();
    this.options = Object.assign({}, TRASH_STATS_SETTINGS);
    this.updateSize(this.size);
    this.daysInMonth = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['size']) {
      this.updateSize(this.size);
    }
    if (changes['type']) {
      this.transactionService.getMostUsedTrash(this.type).subscribe(x => {
        this.trashList = x;
        if (x.length === 0) {
          return;
        }
        this.selectedTrash = this.trashList[0];
        this.updateGraph(this.selectedTrash);
      });
    }
  }

  chooseTransaction(trash: Transaction) {
    this.selectedTrash = trash;
    this.updateGraph(trash);
  }

  updateGraph(trash: Transaction) {
    this.transactionService.getTransactions(trash.trash._id, 'trash').subscribe(t => {
      this.trash = t;
      this.options.legendTitle = this.trash[0].trash.name;
      let negativeOperation = 'Transportovan';
      let positiveOperation = 'Proizveden';
      if (this.type === 'treatment' || this.type === 'disposal') {
        positiveOperation = 'Preuzet';
        negativeOperation = this.type === 'treatment' ? 'Obrađen' : 'Odložen'
      }
      const data1 = {name: positiveOperation, value: 0};
      const data2 = {name: negativeOperation, value: 0};
      this.data = [];
      for (let i = 0; i < this.daysInMonth; i++) {
        this.data[i] = {name: (i + 1) + '', series: []};
      }
      for (let i = 0; i < this.trash.length; i++) {
        let dayNumber = '-';
        if (this.trash[i].date.toString().substring(8, 10).charAt(0) !== '0') {
          dayNumber = this.trash[i].date.toString().substring(8, 10);
        } else {
          dayNumber = this.trash[i].date.toString().substring(9, 10);
        }
        if (this.trash[i].trashAmount > 0) {
          data1.value += this.trash[i].trashAmount;
          this.data[dayNumber].series.push({name: positiveOperation, value: this.trash[i].trashAmount});
        } else {
          data2.value += Math.abs(this.trash[i].trashAmount);
          this.data[dayNumber].series.push({name: negativeOperation, value: this.trash[i].trashAmount});
        }
      }
    });
  }

  updateSize(size: String) {
    if (size === 'tiny')
      this.options.view = [];
    else if (size === 'small')
      this.options.view = [];
    else if (size === 'medium')
      this.options.view = [500, 300];
    else if (size === 'large')
      this.options.view = [700, 300];
    else if (size === 'giant')
      this.options.view = [1100, 500];
  }

}
