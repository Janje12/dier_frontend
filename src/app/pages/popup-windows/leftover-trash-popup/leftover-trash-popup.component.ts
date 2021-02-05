import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Catalog } from '../../../@core/data/catalog';
import { Trash } from '../../../@core/data/trash';
import { Storage } from '../../../@core/data/storage';
import { Transaction } from '../../../@core/data/transaction';
import { CatalogService } from '../../../@core/service/catalog.service';
import { RoleService } from '../../../@core/service/role.service';
import { TransactionsService } from '../../../@core/service/transactions.service';

@Component({
  selector: 'leftover-trash-popup',
  templateUrl: './leftover-trash-popup.component.html',
  styleUrls: ['./leftover-trash-popup.component.css'],
})
export class LeftoverTrashPopupComponent implements OnInit {
  @Output() callLeftoverTrash:
    EventEmitter<{ selectedTransaction: Transaction, leftoverTrashCreated: Trash[], selectedStorage: Storage }> =
    new EventEmitter<{
      selectedTransaction: Transaction, leftoverTrashCreated: Trash[],
      selectedStorage: Storage,
    }>();
  @Input() selectedTrash: Trash;
  @Input() selectedTransaction: Transaction;
  @Input() storageProduction: Storage[];
  storageProduction$: Observable<Storage[]>;
  selectedStorage: Storage;
  leftoverTrashCreated: Trash[];

  unfinshedTransactions$: Observable<Transaction[]>;
  catalog$: Observable<Catalog[]>;
  catalog: Catalog[];

  constructor(private catalogService: CatalogService, private transactionService: TransactionsService,
              private roleService: RoleService) {
  }

  ngOnInit(): void {
    this.leftoverTrashCreated = [];
    if (this.selectedTransaction === undefined) {
      this.unfinshedTransactions$ = this.transactionService
        .getUnfinishedTransactions(this.selectedTrash._id, this.roleService.getCompanyID());
    } else {
      const tmp = [];
      tmp.push(this.selectedTransaction);
      this.unfinshedTransactions$ = of(tmp);
    }
    this.storageProduction$ = of(this.storageProduction);
    this.catalogService.getCatalogs('').subscribe(c => {
      this.catalog = c;
      this.catalog$ = of(c);
    });
  }

  callLeftoverTrashMethod() {
    this.callLeftoverTrash.emit({
      selectedTransaction: this.selectedTransaction,
      leftoverTrashCreated: this.leftoverTrashCreated,
      selectedStorage: this.selectedStorage,
    });
  }

  chooseTransaction(transaction: Transaction) {
    this.selectedTransaction = transaction;
  }

  onChange(value: string) {
    const filterValue = value.toLowerCase();
    this.catalog$ = of(this.catalog.filter(x => x.name.includes(filterValue)));
  }

  updateLeftoverTrash(data, inputForm) {
    inputForm.value = '';
    delete data['_id'];
    data.opis = data.naziv;
    data.kolicina = 0;
    if (this.leftoverTrashCreated.includes(data))
      return;
    this.leftoverTrashCreated.push(data);
  }

  removeTrash(data) {
    this.leftoverTrashCreated = this.leftoverTrashCreated.filter(x => x.indexNumber !== data.indeksniBroj);
  }
}
