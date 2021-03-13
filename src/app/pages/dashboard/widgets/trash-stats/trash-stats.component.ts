import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Transaction } from '../../../../@core/data/transaction';
import { TransactionsService } from '../../../../@core/service/transactions.service';
import { TRASH_STATS_SETTINGS } from './trash-stats.settings';

@Component({
  selector: 'widget-trash-stats',
  templateUrl: './trash-stats.component.html',
  styleUrls: ['./trash-stats.component.css'],
})
export class TrashStatsComponent implements OnInit {
  @Input() type: string;
  @Output() isLoaded: EventEmitter<boolean> = new EventEmitter<boolean>();
  trash: Transaction[];
  options = TRASH_STATS_SETTINGS;
  trashList: Transaction[] = [];
  selectedTrash: Transaction;

  constructor(private transactionService: TransactionsService) {
  }

  chooseTransaction(trash: Transaction) {
    this.selectedTrash = trash;
    this.updateGraph();
  }

  ngOnInit(): void {
    this.transactionService.getMostUsedTrash(this.type).subscribe(x => {
      this.trashList = x;
      if (x.length === 0) {
       this.isLoaded.emit();
       return;
      }
      this.selectedTrash = this.trashList[0];
      this.updateGraph();
    });
  }

  updateGraph() {
    this.transactionService.getTransactions(this.selectedTrash.trash._id, 'trash').subscribe(t => {
      this.trash = t;
      const days = [];
      const data1 = new Array(30);
      const data2 = new Array(30);
      for (let i = 0; i < data1.length; i++) {
        data1[i] = 0;
        data2[i] = 0;
      }

      for (let i = 1; i <= 30; i++) {
        days.push(i);
      }
      for (let i = 0; i < this.trash.length; i++) {
        let dayNumber = '-';
        if (this.trash[i].date.toString().substring(8, 10).charAt(0) !== '0') {
          dayNumber = this.trash[i].date.toString().substring(8, 10);
        } else {
          dayNumber = this.trash[i].date.toString().substring(9, 10);
        }
        if (this.trash[i].trashAmount > 0)
          data1[dayNumber] += this.trash[i].trashAmount;
        else
          data2[dayNumber] += Math.abs(this.trash[i].trashAmount);
      }
      this.options.title.text = this.trash[0].trash.name;
      let negativeOperation = 'Obradjen otpad';
      if (this.type === 'production')
        negativeOperation = 'Transportovan otpad';
      this.options.legend.data = ['Dodat otpad', negativeOperation];
      this.options.xAxis.data = [...days];
      this.options.series[0].name = 'Dodat otpad';
      this.options.series[0].data = [...data1];
      this.options.series[1].name = negativeOperation;
      this.options.series[1].data = [...data2];
      this.isLoaded.emit();
    });
  }
}
