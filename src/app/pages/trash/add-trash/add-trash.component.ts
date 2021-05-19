import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbAuthService } from '@nebular/auth';
import { Permit } from '../../../@core/data/permit';
import { Storage } from '../../../@core/data/storage';
import { Trash } from '../../../@core/data/trash';
import { UnsafeTrash } from '../../../@core/data/unsafeTrash';
import { CatalogService } from '../../../@core/service/catalog.service';
import { LocalDataSource } from 'ng2-smart-table';
import { PermitService } from '../../../@core/service/permit.service';
import { RoleService } from '../../../@core/service/role.service';
import { ToastrService } from '../../../@core/service/toastr.service';
import { TrashService } from '../../../@core/service/trash.service';
import { StorageService } from '../../../@core/service/storage.service';
import { TRASH_CATALOG_SETTINGS } from '../trashCatalogTable';
import { TRASH_STATES, D_TAGS, R_TAGS, H_LIST, Y_LIST, C_LIST } from '../../../@core/utils/trash-utils';

@Component({
  selector: 'pages-add-trash',
  styleUrls: ['./add-trash.component.scss'],
  templateUrl: './add-trash.component.html',
})
export class AddTrashComponent implements OnInit {

  settings: any;
  catalog: LocalDataSource = new LocalDataSource();
  storageAmmountUnit: string = 'KG';
  storages: Storage[] = [];
  selectedStorage: Storage;
  permits: Permit[] = [];
  states: string[];
  dSigns: string[]
  rSigns: string[];
  hList: string[];
  yList: string[];
  cList: string[];
  trash: Trash = {
    amount: null, desc: '', indexNumber: '', name: '', dSign: '', rSign: '', state: '',
  };
  componentsNo: number = 0;
  trashType: string;
  operation: string;
  checkIssues: boolean = false;

  constructor(private catalogService: CatalogService, private trashService: TrashService,
              private router: Router, private authService: NbAuthService, private activatedRoute: ActivatedRoute,
              private storageService: StorageService, private toastrService: ToastrService,
              private roleService: RoleService, private permitService: PermitService) {
    this.settings = Object.assign({}, TRASH_CATALOG_SETTINGS);
    this.states = Object.assign([], TRASH_STATES);
    this.dSigns = Object.assign([], D_TAGS);
    this.rSigns = Object.assign([], R_TAGS);
    this.hList = Object.assign([], H_LIST);
    this.yList = Object.assign([], Y_LIST);
    this.cList = Object.assign([], C_LIST);

    this.activatedRoute.params.subscribe(params => {
      this.storages = [];
      this.selectedStorage = undefined;
      this.operation = params.operation;
      this.trashType = params.trashType;
      this.ngOnInit();
    });
  }

  ngOnInit(): void {
    this.storageService.getCompaniesStorage(this.roleService.getCompanyID(), this.operation).subscribe(x => {
      this.storages = x;
    });
    if (this.operation !== 'production') {
      this.updatePermits();
    } else {
      if (this.trashType === 'safe')
        this.catalogService.getSafeTrash().subscribe(k => {
          this.catalog.load(k);
        });
      else
        this.catalogService.getUnsafeTrash().subscribe(k => {
          this.catalog.load(k);
        });
    }
    if (this.trashType === 'unsafe')
      this.trash = this.trash as UnsafeTrash;
  }

  updatePermits() {
    this.permitService.getCompaniesPermits(this.roleService.getCompanyID(), this.operation).subscribe(p => {
      this.permits = p;
      for (let i = 0; i < this.permits.length; i++) {
        if (this.trashType === 'safe') {
          this.permits[i].trashList = this.permits[i].trashList.filter(x => !x.indexNumber.includes('*'));
        } else {
          this.permits[i].trashList = this.permits[i].trashList.filter(x => x.indexNumber.includes('*'));
        }
      }
      this.updateCatalog(this.permits[0]);
    });
  }

  updateCatalog(permit: Permit): void {
    if (permit === undefined) {
      this.updatePermits();
    }
    this.selectedStorage = this.storages.find(x => x._id === permit.storage._id);
    const usedCatalog = this.selectedStorage.trashes;
    const usedCatalogIDs = Array.from(usedCatalog, x => x.indexNumber);
    let catalog = permit.trashList;
    catalog = catalog.filter(x => !usedCatalogIDs.includes(x.indexNumber));
    this.catalog.load(catalog);
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

  updateCAS(): void {
    const tmp = this.trash as UnsafeTrash;
    tmp.unsafeComponent = new Array(this.componentsNo);
    for (let i = 0; i < this.componentsNo; i++) {
      tmp.unsafeComponent[i] = {
        kgOfMatter: null,
        CAS: '',
        chemicalName: '',
      };
    }
    this.trash = Object.assign({}, tmp);
  }

  /* doesnt recongize the events data from smart table :P*/
  chooseTrash({data}) {
    this.trash.indexNumber = data.indexNumber;
    this.trash.name = data.name;
    this.trash.desc = data.name;
  }

  today(): Date {
    return new Date();
  }

  addTrash(form: NgForm): void {
    if (form.invalid || isNaN(this.trash.amount)) {
      this.checkIssues = true;
      this.toastrService.showToast('Greška', 'Ispravite sve greške da bi ste dodali otpad.', 'warning');
      return;
    }
    if (this.storageAmmountUnit === 'T') {
      this.trash.amount *= 1000;
    }
    delete this.trash._id;
    if (this.selectedStorage.maxAmount < this.selectedStorage.amount + this.trash.amount) {
      this.toastrService.showToast('Greška', 'Ne možete da dodate više otpada nego što vaše skladište može da prihvati: '
        + this.selectedStorage.maxAmount + ' ' + this.selectedStorage.storageUnit, 'warning');
      return;
    }
    this.trashService.createTrash(this.trash, this.selectedStorage._id).subscribe();
    this.toastrService.showToast('Uspeh', 'Uspešno ste dodali otpad na skladište ' + this.selectedStorage.name, 'success');
    this.router.navigate(['pages', 'storage']);
  }

}
