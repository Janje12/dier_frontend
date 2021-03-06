import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { NbWindowRef, NbWindowService } from '@nebular/theme';
import { Observable, of } from 'rxjs';
import { Trash } from '../../../@core/data/trash';
import { Storage, StorageDump } from '../../../@core/data/storage';
import { Transaction } from '../../../@core/data/transaction';
import { RoleService } from '../../../@core/service/role.service';
import { ToastrService } from '../../../@core/service/toastr.service';
import { TrashService } from '../../../@core/service/trash.service';
import { StorageService } from '../../../@core/service/storage.service';
import { TransactionsService } from '../../../@core/service/transactions.service';
import { STORAGE_EDIT_SETTINGS } from '../storage-edit.settings';
import { STORAGE_DISPOSAL_SETTINGS } from './storage-disposal.settings';

@Component({
  selector: 'storage-dump',
  templateUrl: './storage-disposal.component.html',
  styleUrls: ['./storage-disposal.component.scss'],
})
export class StorageDisposalComponent implements OnInit {
  @ViewChild('addTrashTemplate', {read: TemplateRef}) addTrashTemplate: TemplateRef<HTMLElement>;
  @ViewChild('disposeTrashTemplate', {read: TemplateRef}) disposeTrashTemplate: TemplateRef<HTMLElement>;
  @ViewChild('leftoverTrashTemplate', {read: TemplateRef}) leftoverTrashTemplate: TemplateRef<HTMLElement>;
  private windowRef: NbWindowRef;

  @Input() storageDisposal: StorageDump[];
  storageDisposal$: Observable<StorageDump[]>;
  selectedStorageDisposal: StorageDump;
  @Input() storage: Storage[];
  storage$: Observable<Storage[]>;
  selectedStorage: Storage;
  @Output() updateStorageEvent = new EventEmitter<string>();
  selectedTrash: Trash;

  settings: any = STORAGE_DISPOSAL_SETTINGS;
  currentSettings: any = this.settings;
  editSettings: any = STORAGE_EDIT_SETTINGS;
  editIcon: string = 'edit';

  leftoverTrashCreated: Trash[] = [];
  selectedTransaction: Transaction;
  unfinishedTransactions: Transaction[] = [];

  constructor(private storageService: StorageService, private windowService: NbWindowService,
              private trashService: TrashService, private roleService: RoleService,
              private toastrService: ToastrService, private transactionsService: TransactionsService) {
  }

  ngOnInit() {
    this.storageDisposal$ = of(this.storageDisposal);
  }

  private updateStorage(): void {
    this.updateStorageEvent.emit();
  }

  edit(): void {
    if (this.currentSettings !== this.editSettings) {
      this.currentSettings = this.editSettings;
      this.editIcon = 'close';
    } else {
      this.currentSettings = this.settings;
      this.editIcon = 'edit';
    }
  }

  chooseAction(event: any, storage: StorageDump) {
    this.selectedStorageDisposal = storage;
    if (event.action === 'add')
      this.openAddTrashWindow(event.data);
    else if (event.action === 'dispose')
      this.openDisposeTrashWindow(event.data);
    else if (event.action === 'leftover')
      this.openLeftoverTrashWindow(event.data);
  }

  private openAddTrashWindow(trash: Trash) {
    this.selectedTrash = trash;
    this.windowRef = this.windowService.open(this.addTrashTemplate,
      {title: 'Dodaj donetu kolicinu: ' + this.selectedTrash.name});
  }

  addTrashMethod({trashAmmount: trashAmmount, documentNo: documentNo, companyName: companyName}) {
    if (this.selectedStorageDisposal.maxAmount < this.selectedStorageDisposal.amount + trashAmmount) {
      this.toastrService.showToast('Greška', 'Ne možete da dodate više otpada nego što vaše skladište može da prihvati: '
        + this.selectedStorageDisposal.maxAmount + ' ' + this.selectedStorageDisposal.storageUnit, 'warning');
      return;
    }
    this.selectedTrash.amount += trashAmmount;
    this.trashService.updateTrash(this.selectedTrash, this.selectedStorageDisposal._id, this.selectedTrash._id, '_id',
      companyName, documentNo).subscribe(x => {
      this.updateStorage();
    });

    this.toastrService.showToast('Uspeh', 'Uspešno ste dodali ' + trashAmmount + ' (kg) ' + this.selectedTrash.name + ' na skladište.',
      'success');
    this.windowRef.close();
    trashAmmount = NaN;
  }

  private openDisposeTrashWindow(trash: Trash) {
    this.selectedTrash = trash;
    this.windowRef = this.windowService.open(this.disposeTrashTemplate,
      {title: 'Obradi određenu količinu: ' + this.selectedTrash.name});
  }

  disposeTrashMethod({
                       selectedTransaction: selectedTransaction,
                       trashAmmount: trashAmmount, trashCreated: trashCreated,
                     }) {
    if (this.selectedStorageDisposal.amount - trashAmmount < 0) {
      this.toastrService.showToast('Greška', 'Ne možete da dodate obradite više otpada nego što vaše skladište ima: '
        + this.selectedStorageDisposal.amount + ' ' + this.selectedStorageDisposal.storageUnit, 'warning');
      return;
    }
    this.selectedTrash.amount -= trashAmmount;
    const companyName = trashCreated ?
      (selectedTransaction.companyName ? selectedTransaction.companyName : selectedTransaction) : '';
    const documentNo = trashCreated ?
      (selectedTransaction.wmdNo ? selectedTransaction.wmdNo : selectedTransaction) : '';
    this.trashService.updateTrash(this.selectedTrash, this.selectedStorageDisposal._id,
      this.selectedTrash._id, '_id',
      companyName, documentNo).subscribe(x => {
      this.updateStorage();
    });
    if (selectedTransaction !== '-') {
      selectedTransaction.finished = true;
      this.transactionsService.updateTransaction(selectedTransaction, selectedTransaction._id).subscribe(x => {
      });
    }
    this.toastrService.showToast('Uspeh', 'Uspešno ste obradili ' + trashAmmount + ' (kg) '
      + this.selectedTrash.name + ' na skladište.',
      'success');
    this.windowRef.close();
    trashAmmount = NaN;
  }

  openLeftoverTrashWindow(trash: Trash) {
    this.selectedTrash = trash;
    this.transactionsService.getUnfinishedTransactions(this.selectedTrash._id, this.roleService.getCompanyID())
      .subscribe(x => {
        this.unfinishedTransactions = x;
      });
    this.windowRef = this.windowService.open(this.leftoverTrashTemplate,
      {title: 'Završi proizvodnju preostalog otpada'});
  }

  leftoverTrashMethod({
                        selectedTransaction: selectedTransaction, leftoverTrashCreated: leftoverTrashCreated,
                        selectedStorage: selectedStorage,
                      }) {
    let canPass = true;
    leftoverTrashCreated.forEach(trashCreated => {
      if (selectedStorage.maxAmount < selectedStorage.amount + trashCreated.amount || !canPass) {
        canPass = false;
        return;
      }
      this.trashService.updateTrash(trashCreated, selectedStorage._id, trashCreated.indexNumber,
        'indexNumber', undefined, undefined, true).subscribe(x => {
        this.updateStorage();
      });
    });
    if (!canPass) {
      this.toastrService.showToast('Greška', 'Ne možete da dodate više otpada nego što vaše skladište može da prihvati: '
        + selectedStorage.maxAmount + ' ' + selectedStorage.storageUnit, 'warning');
      return;
    }
    selectedTransaction.companyName = null;
    selectedTransaction.wmdNo = null;
    selectedTransaction.finished = true;
    this.transactionsService.updateTransaction(selectedTransaction, selectedTransaction._id).subscribe(x => {
    });
    this.toastrService.showToast('Uspeh', 'Uspesno ste dodali otpade!', 'success');
    this.windowRef.close();
  }

  updateTrash({newData: trash, confirm: confirm}, storage: StorageDump): void {
    this.selectedStorageDisposal = storage;
    try {
      this.trashService.updateTrash(trash, this.selectedStorageDisposal._id, trash._id).subscribe(x => {
        this.updateStorage();
      });
      confirm.resolve();
      this.toastrService.showToast('Uspeh!', 'Uspešno ste uredili ' + trash.name, 'success');
    } catch (err) {
      confirm.reject();
      this.toastrService.showToast('Greška!', 'Došlo je do greške dok ste pokušali da promenite ' + trash.name +
        '. Molimo vas pokušajte kasnije.', 'danger');
    }
  }

  deleteTrash({data: trash, confirm: confirm}, storage: StorageDump): void {
    this.selectedStorageDisposal = storage;
    if (!window.confirm('Da li ste sigurni da želite da obrišete ' + trash.naziv + '?'))
      return;
    try {
      this.trashService.deleteTrash(this.selectedStorageDisposal._id, trash._id).subscribe(x => {
        this.updateStorage();
      });
      confirm.resolve();
      this.toastrService.showToast('Uspeh!', 'Uspešno ste obrisali ' + trash.name, 'success');
    } catch (err) {
      confirm.reject();
      this.toastrService.showToast('Greška!', 'Došlo je do greške dok ste pokušali da obrišete ' + trash.name +
        '. Molimo vas pokušajte kasnije.', 'danger');
    }
  }

}
