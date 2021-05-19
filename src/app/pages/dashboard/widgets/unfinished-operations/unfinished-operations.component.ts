import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NbWindowRef, NbWindowService } from '@nebular/theme';
import { Trash } from '../../../../@core/data/trash';
import { Storage } from '../../../../@core/data/storage';
import { Transaction } from '../../../../@core/data/transaction';
import { RoleService } from '../../../../@core/service/role.service';
import { ToastrService } from '../../../../@core/service/toastr.service';
import { TrashService } from '../../../../@core/service/trash.service';
import { StorageService } from '../../../../@core/service/storage.service';
import { TransactionsService } from '../../../../@core/service/transactions.service';
import { UNFINISHED_OPERATIONS_SETTINGS } from './unfinished-operations.settings';

@Component({
  selector: 'widget-unfinished-operations',
  templateUrl: './unfinished-operations.component.html',
  styleUrls: ['./unfinished-operations.component.css'],
})
export class UnfinishedOperationsComponent implements OnInit {
  @ViewChild('leftoverTrashTemplate', {read: TemplateRef}) leftoverTrashTemplate: TemplateRef<HTMLElement>;
  private windowRef: NbWindowRef;
  @Input() type: string;
  settings: {} = UNFINISHED_OPERATIONS_SETTINGS;
  transactions: Transaction[] = [];
  selectedTrash: Trash;
  selectedTransaction: Transaction;
  storage: Storage[];

  constructor(private windowService: NbWindowService, private storageService: StorageService,
              private trashService: TrashService, private transactionsService: TransactionsService,
              private toastrService: ToastrService, private roleService: RoleService) {
  }

  ngOnInit(): void {
    this.updateTransactions();
    this.storageService.getCompaniesStorage(this.roleService.getCompanyID(), 'production').subscribe(s => {
      this.storage = s;
    });
  }

  private updateTransactions() {
    this.transactionsService.getUnfinishedTransactions(this.type, this.roleService.getCompanyID()).subscribe(t => {
      this.transactions = t;
    });
  }

  openLeftoverTrashWindow({data: transaction}) {
    this.selectedTransaction = transaction;
    this.selectedTrash = transaction.otpad;
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
        this.updateTransactions();
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

}
