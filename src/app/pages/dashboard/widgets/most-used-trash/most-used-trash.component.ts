import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NbWindowRef, NbWindowService } from '@nebular/theme';
import { Storage } from '../../../../@core/data/storage';
import { Trash } from '../../../../@core/data/trash';
import { Transaction } from '../../../../@core/data/transaction';
import { StorageService } from '../../../../@core/service/storage.service';
import { ToastrService } from '../../../../@core/service/toastr.service';
import { TrashService } from '../../../../@core/service/trash.service';
import { TransactionsService } from '../../../../@core/service/transactions.service';

@Component({
  selector: 'widget-most-used-trash',
  templateUrl: './most-used-trash.component.html',
  styleUrls: ['./most-used-trash.component.css'],
})
export class MostUsedTrashComponent implements OnInit {
  @ViewChild('addTrashTemplate', {read: TemplateRef}) addTrashTemplate: TemplateRef<HTMLElement>;
  @ViewChild('processTrashTemplate', {read: TemplateRef}) processTrashTemplate: TemplateRef<HTMLElement>;
  private windowRef: NbWindowRef;

  @Input() type: string;
  transactions: Transaction[] = [];
  trash: Trash[];
  selectedTrash: Trash;
  selectedStorage: Storage;

  constructor(private transactionService: TransactionsService, private windowService: NbWindowService,
              private trashService: TrashService, private toastrService: ToastrService, private storageService: StorageService) {
  }

  ngOnInit(): void {
    this.updateTransactions();
  }

  private updateTransactions() {
    this.transactionService.getMostUsedTrash(this.type).subscribe(x => {
      this.transactions = x;
    });
  }

  private openAddTrashWindow(trash: Trash, storage: any) {
    this.selectedTrash = trash;
    this.storageService.getStorage(storage).subscribe(s => {
      this.selectedStorage = s;
    })
    this.windowRef = this.windowService.open(this.addTrashTemplate,
      {title: 'Dodaj proizvedenu kolicinu: ' + this.selectedTrash.name});
  }

  addTrashMethod({trashAmmount: trashAmmount}) {
    if (this.selectedStorage.maxAmount < this.selectedStorage.amount + trashAmmount) {
      this.toastrService.showToast('Greška', 'Ne možete da dodate više otpada nego što vaše skladište može da prihvati: '
        + this.selectedStorage.maxAmount + ' ' + this.selectedStorage.storageUnit, 'warning');
      return;
    }
    this.selectedTrash.amount += trashAmmount;
    this.trashService.updateTrash(this.selectedTrash, this.selectedStorage._id, this.selectedTrash._id).subscribe(x => {
      this.updateTransactions();
    });
    this.toastrService.showToast('Uspeh',
      'Uspešno ste dodali ' + trashAmmount + ' (kg) ' + this.selectedTrash.name + ' na skladište.',
      'success');
    this.windowRef.close();
    trashAmmount = NaN;
  }

  private openProcessTrashWindow(trash: Trash, storage: any) {
    this.selectedTrash = trash;
    this.storageService.getStorage(storage).subscribe(s => {
      this.selectedStorage = s;
    })
    this.windowRef = this.windowService.open(this.processTrashTemplate,
      {title: 'Obradi određenu količinu: ' + this.selectedTrash.name});
  }

  processTrashMethod({
                       selectedTransaction: selectedTransaction,
                       trashAmmount: trashAmmount, trashCreated: trashCreated,
                     }) {
    if (this.selectedStorage.amount - trashAmmount < 0) {
      this.toastrService.showToast('Greška', 'Ne možete da dodate obradite više otpada nego što vaše skladište ima: '
        + this.selectedStorage.amount + ' ' + this.selectedStorage.storageUnit, 'warning');
      return;
    }
    this.selectedTrash.amount -= trashAmmount;
    const companyName = trashCreated ?
      (selectedTransaction.companyName ? selectedTransaction.companyName : selectedTransaction) : '';
    const documentNo = trashCreated ?
      (selectedTransaction.wmdNo ? selectedTransaction.wmdNo : selectedTransaction) : '';
    this.trashService.updateTrash(this.selectedTrash, this.selectedStorage._id, this.selectedTrash._id, '_id',
      companyName, documentNo).subscribe(x => {
      this.updateTransactions();
    });
    if (selectedTransaction !== '-') {
      selectedTransaction.finished = true;
      this.transactionService.updateTransaction(selectedTransaction, selectedTransaction._id).subscribe(x => {
      });
    }
    this.toastrService.showToast('Uspeh', 'Uspešno ste obradili ' + trashAmmount + ' (kg) '
      + this.selectedTrash.name + ' na skladište.',
      'success');
    this.windowRef.close();
    trashAmmount = NaN;
  }

}
