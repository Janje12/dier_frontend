import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Trash } from '../../../@core/data/trash';
import { Transaction } from '../../../@core/data/transaction';
import { TransactionsService } from '../../../@core/service/transactions.service';

@Component({
  selector: 'process-trash-popup',
  templateUrl: './process-trash-popup.component.html',
  styleUrls: ['./process-trash-popup.component.css'],
})
export class ProcessTrashPopupComponent implements OnInit {
  @Output() callProcessTrash:
    EventEmitter<{ selectedTransaction: Transaction, trashAmmount: number, trashCreated: boolean }>
    = new EventEmitter<{ selectedTransaction: Transaction, trashAmmount: number, trashCreated: boolean }>();
  @Input() selectedTrash: Trash;
  storageAmmountUnit: string = 'KG';
  trashAmmount: number;

  selectedTransaction: Transaction;
  transactions: Transaction[];
  transactions$: Observable<Transaction[]>;
  dateStrings: string[] = [];
  leftoverTrashCreated: boolean = false;

  constructor(private transactionService: TransactionsService) {
  }

  ngOnInit(): void {
    this.transactionService.getTransportersTransactions(this.selectedTrash._id).subscribe(t => {
      this.transactions = t;
      this.transactions$ = of(t);
      this.dateStrings = [];
      this.transactions.forEach(d => {
        this.dateStrings.push(d.date.toString().slice(0, 10));
      });
    });
  }

  onChange(value: string) {
    const filterValue = value.toLowerCase();
    this.transactions$ = of(this.transactions.filter(x => x.companyName.includes(filterValue)));
  }

  chooseTransaction(inputForm, transaction: Transaction) {
    this.selectedTransaction = transaction;
    if (inputForm. value !== '-')
      inputForm.value = transaction.companyName + ' | ' + transaction.trashAmount + ' kg';
  }

  callProcessTrashMethod() {
    if (this.storageAmmountUnit !== 'KG')
      this.trashAmmount *= 1000;
    this.callProcessTrash.emit({
      selectedTransaction: this.selectedTransaction,
      trashAmmount: this.trashAmmount,
      trashCreated: this.leftoverTrashCreated,
    });
  }

}
