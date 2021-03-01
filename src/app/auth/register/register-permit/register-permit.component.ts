import { Component, Inject, OnInit } from '@angular/core';
import { getDeepFromObject, NB_AUTH_OPTIONS } from '@nebular/auth';
import { LocalDataSource } from 'ng2-smart-table';
import { of } from 'rxjs';
import { first } from 'rxjs/operators';
import { Permit } from '../../../@core/data/permit';
import { Company } from '../../../@core/data/company';
import { Catalog } from '../../../@core/data/catalog';
import { CatalogService } from '../../../@core/service/catalog.service';
import { RegisterService } from '../../../@core/service/register.service';
import { CATALOG_SETTINGS } from './catalog.settings';

@Component({
  selector: 'register-permit',
  templateUrl: './register-permit.component.html',
  styleUrls: ['./register-permit.component.scss'],
})
export class RegisterPermitComponent implements OnInit {

  catalog: LocalDataSource = new LocalDataSource();
  company: Company;
  permitCode: string;
  permit: Permit;
  trashList: Catalog[];
  settings: {} = CATALOG_SETTINGS;
  permitType: string = '';

  constructor(@Inject(NB_AUTH_OPTIONS) protected options = {}, private registerService: RegisterService,
              private catalogService: CatalogService) {
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }

  ngOnInit(): void {
    this.registerService.getPermit().subscribe(d => {
      this.permitCode = d;
    });
    this.registerService.getCompany().subscribe(f => {
      if (f !== undefined) {
        this.company = f;
        this.permit = this.company.permits.filter(x => x.code === this.permitCode)[0];
        this.permitType = this.permit.type;
        this.trashList = this.permit.trashList;
      }
    });
    this.registerService.sendCompany(of(this.company));
    let safe = false, unsafe = false;
    this.registerService.getOperations().subscribe(o => {
      o.forEach(x => {
        if (x.includes('Neopasnog'))
          safe = true;
        if (x.includes('Opasnog'))
          unsafe = true;
      });
      if (safe && !unsafe)
        this.catalogService.getSafeTrash().pipe(first()).subscribe(k => {
          k.sort((a, b) => a.indexNumber.localeCompare(b.indexNumber));
          this.catalog.load(k);
        });
      else if (unsafe && !safe)
        this.catalogService.getUnsafeTrash().pipe(first()).subscribe(k => {
          k.sort((a, b) => a.indexNumber.localeCompare(b.indexNumber));
          this.catalog.load(k);
        });
      else if (unsafe && safe)
        this.catalogService.getCatalogs().pipe(first()).subscribe(k => {
          k.sort((a, b) => a.indexNumber.localeCompare(b.indexNumber));
          this.catalog.load(k);
        });
    });
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

  addTrash(trash: Catalog) {
    if (this.trashList.some(x => x._id === trash._id)) {
      this.removeTrash(trash);
    } else {
      this.permit.trashList.push(trash);
    }
    this.company.permits.filter(x => x.code === this.permitCode)[0] = this.permit;
  }

  removeTrash(trash: Catalog) {
    const found = this.trashList.filter(x => x._id === trash._id)[0];
    if (found) {
      const index = this.trashList.indexOf(found, 0);
      if (index > -1)
        this.trashList.splice(index, 1);
    }
  }

}
