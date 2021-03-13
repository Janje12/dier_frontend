import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { getDeepFromObject, NB_AUTH_OPTIONS } from '@nebular/auth';
import { LocalDataSource } from 'ng2-smart-table';
import { Permit } from '../../../@core/data/permit';
import { CatalogService } from '../../../@core/service/catalog.service';
import { PermitService } from '../../../@core/service/permit.service';
import { RoleService } from '../../../@core/service/role.service';
import { CATALOG_SETTINGS } from '../../trashCatalog.settings';

@Component({
  selector: 'add-permit-popup',
  templateUrl: './add-permit-popup.component.html',
  styleUrls: ['./add-permit-popup.component.css'],
})
export class AddPermitPopupComponent implements OnInit {
  @Input() type: string;
  @Output() updatePermits: EventEmitter<string> = new EventEmitter<string>();
  @Output() openTrashList: EventEmitter<Permit> = new EventEmitter<Permit>();

  permit: Permit = {
    code: '', dateCreation: new Date(),
    dateExpiration: new Date(), name: '', trashList: [], type: '',
  };
  catalog: LocalDataSource = new LocalDataSource();
  settings: any = CATALOG_SETTINGS;

  constructor(private permitService: PermitService, @Inject(NB_AUTH_OPTIONS) protected options = {},
              private roleService: RoleService, private catalogService: CatalogService) {
  }

  ngOnInit(): void {
    this.catalogService.getCatalogs().subscribe(c => {
      this.catalog.load(c);
    });
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }

  addPermit() {
    this.permit.type = this.type;
    this.permitService.createPermit(this.permit, this.roleService.getCompanyID()).subscribe(x => {
    });
    this.updatePermits.emit('update');
  }

  dateValid(permit: Permit): Boolean {
    return permit.dateCreation <= permit.dateExpiration;
  }

  chooseTrash() {
    this.openTrashList.emit(this.permit);
  }

  addTrashToList({data: trash}) {
    if (this.permit.trashList.some(x => x._id === trash._id)) {
      this.removeTrashFromList(trash);
    } else {
      this.permit.trashList.push(trash);
    }
  }

  removeTrashFromList(trash: any) {
    const found = this.permit.trashList.filter(x => x._id === trash._id)[0];
    if (found) {
      const index = this.permit.trashList.indexOf(found, 0);
      if (index > -1)
        this.permit.trashList.splice(index, 1);
    }
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
}
