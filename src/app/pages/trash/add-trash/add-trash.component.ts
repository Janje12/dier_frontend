import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbAuthService } from '@nebular/auth';
import { NbComponentStatus, NbToastrService } from '@nebular/theme';
import { Permit } from '../../../@core/data/permit';
import { Storage } from '../../../@core/data/storage';
import { UnsafeTrash } from '../../../@core/data/unsafeTrash';
import { CatalogService } from '../../../@core/service/catalog.service';
import { LocalDataSource } from 'ng2-smart-table';
import { Trash } from '../../../@core/data/trash';
import { PermitService } from '../../../@core/service/permit.service';
import { RoleService } from '../../../@core/service/role.service';
import { TrashService } from '../../../@core/service/trash.service';
import { StorageService } from '../../../@core/service/storage.service';
import { TRASH_CATALOG_SETTINGS } from '../trashCatalogTable';
import { TRASH_STATES, D_TAGS, R_TAGS } from '../../../@core/utils/trash-utils';

@Component({
  selector: 'pages-add-trash',
  styleUrls: ['./add-trash.component.scss'],
  templateUrl: './add-trash.component.html',
})
export class AddTrashComponent implements OnInit {

  settings: any = TRASH_CATALOG_SETTINGS;
  catalog: LocalDataSource = new LocalDataSource();
  storageAmmountUnit: string = 'KG';
  storages: Storage[] = [];
  selectedStorage: Storage;
  permits: Permit[] = [];
  states: string[] = TRASH_STATES;
  dSigns: string[] = D_TAGS;
  rSigns: string[] = R_TAGS;
  trash: any = {
    cList: '', hList: '', unsafeComponent: [], yList: '',
    amount: 0, desc: '', indexNumber: '', name: '', dSign: '', rSign: '',
  };
  componentsNo: number = 0;
  trashType: string;
  operation: string;

  constructor(private catalogService: CatalogService, private trashService: TrashService,
              private router: Router, private authService: NbAuthService, private activatedRoute: ActivatedRoute,
              private storageService: StorageService, private toastrService: NbToastrService,
              private roleService: RoleService, private permitService: PermitService) {
    this.operation = this.activatedRoute.snapshot.params.operation;
    this.trashType = this.activatedRoute.snapshot.params.trashType;
  }

  ngOnInit(): void {
    if (this.trashType === 'safe')
      this.catalogService.getSafeTrash().subscribe(k => {
        this.catalog.load(k);
      });
    else
      this.catalogService.getUnsafeTrash().subscribe(k => {
        this.catalog.load(k);
      });
    this.storageService.getCompaniesStorage(this.roleService.getCompanyID(), this.operation).subscribe(x => {
      this.storages = x;
    });
    if (this.operation !== 'production')
      this.permitService.getCompaniesPermits(this.operation, this.roleService.getCompanyID()).subscribe(p => {
        this.permits = p;
      });
    if (this.trashType === 'unsafe')
      this.trash = this.trash as UnsafeTrash;
  }

  onSearch(query: string) {
    if (query === '')
      this.catalog.setFilter([]);
    this.catalog.setFilter([
      {
        field: 'indexNumber',
        search: query,
        filter: function filterFunction(cell: any, search: string): boolean {
          cell = cell.replace(/\s+/g, '').includes(search.replace(/\s+/g, ''));
          return cell;
        },
      },
      {
        field: 'name',
        search: query,
      },
    ], false);
  }

  updateCatalog(permit: Permit): void {
    this.selectedStorage = this.storages.find(x => x._id === permit.storage._id);
    const usedCatalog = this.selectedStorage.trashes;
    const usedCatalogIDs = Array.from(usedCatalog, x => x.indexNumber);
    let catalog = permit.trashList;
    catalog = catalog.filter(x => !usedCatalogIDs.includes(x.indexNumber));
    this.catalog.load(catalog);
  }

  updateCAS(): void {
    this.trash.unsafeComponent = new Array(this.componentsNo);
    for (let i = 0; i < this.componentsNo; i++) {
      this.trash.unsafeComponent[i] = {
        kgOfMatter: 0,
        CAS: '',
        chemicalName: '',
      };
    }
  }

  /* doesnt recongize the events data from smart table :P*/
  chooseTrash({data}) {
    this.trash.indexNumber = data.indexNumber;
    this.trash.name = data.name;
    this.trash.desc = data.desc;
  }

  today(): Date {
    return new Date();
  }

  addTrash(): void {
    if (this.storageAmmountUnit === 'T') {
      this.trash.amount *= 1000;
    }
    delete this.trash._id;
    this.trashService.createTrash(this.trash, this.selectedStorage._id).subscribe();
    this.showToast('Uspeh', 'Uspešno ste dodali otpad na skladište ' + this.selectedStorage.name, 'success');
    this.router.navigate(['pages', 'storage']);
  }

  private showToast(title: String, message: String, status: NbComponentStatus) {
    this.toastrService.show(
      message,
      title,
      {status});
  }

}
