import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { NbWindowRef, NbWindowService } from '@nebular/theme';
import { Observable, of } from 'rxjs';
import { Trash } from '../../../@core/data/trash';
import { Storage, StorageTreatment } from '../../../@core/data/storage';
import { Transaction } from '../../../@core/data/transaction';
import { RoleService } from '../../../@core/service/role.service';
import { ToastrService } from '../../../@core/service/toastr.service';
import { TrashService } from '../../../@core/service/trash.service';
import { StorageService } from '../../../@core/service/storage.service';
import { TransactionsService } from '../../../@core/service/transactions.service';
import { STORAGE_EDIT_SETTINGS } from '../storage-edit.settings';
import { STORAGE_TREATMENT_SETTINGS } from './storage-treatment.settings';

@Component({
  selector: 'storage-treatment',
  templateUrl: './storage-treatment.component.html',
  styleUrls: ['./storage-treatment.component.scss'],
})
export class StorageTreatmentComponent implements OnInit {
  @ViewChild('addTrashTemplate', {read: TemplateRef}) addTrashTemplate: TemplateRef<HTMLElement>;
  @ViewChild('processTrashTemplate', {read: TemplateRef}) processTrashTemplate: TemplateRef<HTMLElement>;
  @ViewChild('leftoverTrashTemplate', {read: TemplateRef}) leftoverTrashTemplate: TemplateRef<HTMLElement>;
  private windowRef: NbWindowRef;

  @Input() storageTreatment: StorageTreatment[];
  storageTreatment$: Observable<StorageTreatment[]>;
  selectedStorageTreatment: StorageTreatment;
  @Input() storage: Storage[];
  @Output() updateStorageEvent = new EventEmitter<string>();
  selectedTrash: Trash;

  settings: any = STORAGE_TREATMENT_SETTINGS;
  currentSettings: any = this.settings;
  editSettings: any = STORAGE_EDIT_SETTINGS;
  editIcon: string = 'edit';

  leftoverTrashCreated: Trash[] = [];
  unfinishedTransactions: Transaction[] = [];

  constructor(private storageService: StorageService, private windowService: NbWindowService,
              private trashService: TrashService, private transactionsService: TransactionsService,
              private toastrService: ToastrService, private roleService: RoleService) {
  }

  ngOnInit() {
    this.storageTreatment$ = of(this.storageTreatment);
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

  chooseAction(event: any, storage: StorageTreatment) {
    this.selectedStorageTreatment = storage;
    if (event.action === 'add')
      this.openAddTrashWindow(event.data);
    else if (event.action === 'process')
      this.openProcessTrashWindow(event.data);
    else if (event.action === 'leftover')
      this.openLeftoverTrashWindow(event.data);
  }

  private openAddTrashWindow(trash: Trash) {
    this.selectedTrash = trash;
    this.windowRef = this.windowService.open(this.addTrashTemplate,
      {title: 'Dodaj donetu kolicinu: ' + this.selectedTrash.name});
  }

  addTrashMethod({trashAmmount: trashAmmount, documentNo: documentNo, companyName: companyName}) {
    if (this.selectedStorageTreatment.maxAmount < this.selectedStorageTreatment.amount + trashAmmount) {
      this.toastrService.showToast('Greška', 'Ne možete da dodate više otpada nego što vaše skladište može da prihvati: '
        + this.selectedStorageTreatment.maxAmount + ' ' + this.selectedStorageTreatment.storageUnit, 'warning');
      return;
    }
    this.selectedTrash.amount += trashAmmount;
    this.trashService.updateTrash(this.selectedTrash, this.selectedStorageTreatment._id, this.selectedTrash._id, '_id',
      companyName, documentNo).subscribe(x => {
      this.updateStorage();
    });
    this.toastrService.showToast('Uspeh',
      'Uspešno ste dodali ' + trashAmmount + ' (kg) ' + this.selectedTrash.name + ' na skladište.',
      'success');
    this.windowRef.close();
    trashAmmount = NaN;
  }

  private openProcessTrashWindow(trash: Trash) {
    this.selectedTrash = trash;
    this.windowRef = this.windowService.open(this.processTrashTemplate,
      {title: 'Obradi određenu količinu: ' + this.selectedTrash.name});
  }

  processTrashMethod({
                       selectedTransaction: selectedTransaction,
                       trashAmmount: trashAmmount, trashCreated: trashCreated,
                     }) {
    if (this.selectedStorageTreatment.amount - trashAmmount < 0) {
      this.toastrService.showToast('Greška', 'Ne možete da dodate obradite više otpada nego što vaše skladište ima: '
        + this.selectedStorageTreatment.amount + ' ' + this.selectedStorageTreatment.storageUnit, 'warning');
      return;
    }
    this.selectedTrash.amount -= trashAmmount;
    const companyName = trashCreated ?
      (selectedTransaction.companyName ? selectedTransaction.companyName : selectedTransaction) : '';
    const documentNo = trashCreated ?
      (selectedTransaction.wmdNo ? selectedTransaction.wmdNo : selectedTransaction) : '';
    this.trashService.updateTrash(this.selectedTrash, this.selectedStorageTreatment._id, this.selectedTrash._id, '_id',
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
      this.trashService.updateTrash(trashCreated, selectedStorage._id,
        trashCreated.indexNumber, 'indexNumber', undefined, undefined, true).subscribe(x => {
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

  updateTrash({newData: trash, confirm: confirm}, storage: StorageTreatment): void {
    this.selectedStorageTreatment = storage;
    try {
      this.trashService.updateTrash(trash, this.selectedStorageTreatment._id, trash._id).subscribe(x => {
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

  deleteTrash({data: trash, confirm: confirm}, storage: StorageTreatment): void {
    this.selectedStorageTreatment = storage;
    if (!window.confirm('Da li ste sigurni da želite da obrišete ' + trash.naziv + '?'))
      return;
    try {
      this.trashService.deleteTrash(this.selectedStorageTreatment._id, trash._id).subscribe(x => {
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
