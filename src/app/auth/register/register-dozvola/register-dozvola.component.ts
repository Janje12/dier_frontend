import { Component, Inject, OnInit } from '@angular/core';
import { getDeepFromObject, NB_AUTH_OPTIONS } from '@nebular/auth';
import { LocalDataSource } from 'ng2-smart-table';
import { of } from 'rxjs';
import { first } from 'rxjs/operators';
import { Dozvola } from '../../../@core/data/dozvola';
import { Firma } from '../../../@core/data/firma';
import { Katalog } from '../../../@core/data/katalog';
import { KatalogService } from '../../../@core/service/katalog.service';
import { RegisterService } from '../../../@core/service/register.service';

@Component({
  selector: 'ngx-register-dozvola',
  templateUrl: './register-dozvola.component.html',
  styleUrls: ['./register-dozvola.component.scss'],
})
export class RegisterDozvolaComponent implements OnInit {

  katalog: LocalDataSource = new LocalDataSource();
  firma: Firma;
  sifraDozvole: string;
  dozvolа: Dozvola;
  listaOtpada: Katalog[];

  constructor(@Inject(NB_AUTH_OPTIONS) protected options = {}, private registerService: RegisterService,
              private katalogService: KatalogService) {
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }

  ngOnInit(): void {
    this.registerService.getDozvola().subscribe(d => {
      this.sifraDozvole = d;
    });
    this.registerService.getFirma().subscribe(f => {
      if (f !== undefined) {
        this.firma = f;
        this.dozvolа = this.firma.dozvola.filter(x => x.sifra === this.sifraDozvole)[0];
        this.listaOtpada = this.dozvolа.listaOtpada;
      }
    });
    this.registerService.sendFirma(of(this.firma));
    this.katalogService.getKatalog().pipe(first()).subscribe(k => {
      this.katalog.load(k);
    });
  }

  settings = {
    pager: {
      perPage: 5,
    },
    hideSubHeader: true,
    actions: {
      columnTitle: 'Odaberi',
      position: 'right',
      add: false,
      delete: false,
      edit: false,
      custom: [
        {
          name: 'izaberi',
          title: '<i class="fa fa-plus"></i>',
        },
      ],
    },
    columns: {
      indeksniBroj: {
        title: 'Indeksni Broj',
        filter: false,
      },
      naziv: {
        title: 'Naziv',
        filter: false,
      },
    },
  };

  onSearch(query: string = '') {
    this.katalog.setFilter([
      {
        field: 'indeksniBroj',
        search: query,
        filter: function filterFunction(cell: any, search: string): boolean {
          cell = cell.replace(/\s+/g, '').includes(search.replace(/\s+/g, ''));
          return cell;
        },
      },
    ], true);
  }

  chooseOtpad(data: any) {
    // @ts-ignore
    let otpad = data;
    if (data.data !== undefined)
      otpad = data.data;
    if (this.listaOtpada.some(x => x._id === otpad._id)) {
      this.removeOtpad(otpad);
    } else {
      this.dozvolа.listaOtpada.push(otpad);
    }
    this.firma.dozvola.filter(x => x.sifra === this.sifraDozvole)[0] = this.dozvolа;
  }

  removeOtpad(otpad: any) {
    const found = this.listaOtpada.filter(x => x._id === otpad._id)[0];
    if (found) {
      const index = this.listaOtpada.indexOf(found, 0);
      if (index > -1)
        this.listaOtpada.splice(index, 1);
    }
  }

}
