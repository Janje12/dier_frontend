import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Permit } from '../../../@core/data/permit';
import { Catalog } from '../../../@core/data/catalog';
import { CatalogService } from '../../../@core/service/catalog.service';
import { CATALOG_SETTINGS } from '../../trashCatalog.settings';

@Component({
  selector: 'view-permits-trash-popup',
  templateUrl: './view-permits-trash-popup.component.html',
  styleUrls: ['./view-permits-trash-popup.component.css'],
})
export class ViewPermitsTrashPopupComponent implements OnInit {
  @Output() callUpdatePermitsTrash: EventEmitter<Catalog[]> = new EventEmitter<Catalog[]>();
  @Input() selectedPermit: Permit;

  trashList: Catalog[] = [];
  catalog: LocalDataSource = new LocalDataSource();
  settings: any = CATALOG_SETTINGS;

  constructor(private catalogService: CatalogService) {
  }

  ngOnInit(): void {
    this.trashList = this.selectedPermit.trashList;
    this.catalogService.getCatalogs().subscribe(c => {
      this.catalog.load(c);
    });
  }

  callUpdatePermitsTrashMethod() {
    this.callUpdatePermitsTrash.emit(this.trashList);
  }

  addTrashToList({data: trash}, button: any) {
    if (!button.disabled)
      return;
    if (this.trashList.some(x => x._id === trash._id)) {
      this.removeTrashFromList(trash);
    } else {
      this.trashList.push(trash);
    }
  }

  removeTrashFromList(trash: any) {
    const found = this.trashList.filter(x => x._id === trash._id)[0];
    if (found) {
      const index = this.trashList.indexOf(found, 0);
      if (index > -1)
        this.trashList.splice(index, 1);
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
