import { Component, OnInit } from '@angular/core';
import { KatalogService } from '../../../@core/service/katalog.service';
import { LocalDataSource } from 'ng2-smart-table';
import { NOtpad } from '../../../@core/data/notpad';
import { SkladisteService } from '../../../@core/service/skladiste.service';

@Component({
  selector: 'ngx-dodaj-otpad',
  styleUrls: ['./dodaj-otpad.component.scss'],
  templateUrl: './dodaj-otpad.component.html',
})
export class DodajOtpadComponent implements OnInit {

  constructor(private katalogService: KatalogService, private skladisteService: SkladisteService) {
  }

  ngOnInit(): void {
    this.katalogService.getNeopasanKatalog().subscribe(k => {
      this.katalog.load(k);
    });
  }

  public katalog: LocalDataSource = new LocalDataSource();

  public settings = {
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
          name: 'dodaj',
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

  notpad: NOtpad = {
    _id: '',
    indeksniBroj: '',
    naziv: '',
    opis: '',
    fizickoStanje: '',
    kolicina: 0,
  };

  onSearch(query: string = '') {
    this.katalog.setFilter([
      {
        field: 'indeksniBroj',
        search: query,
      },
    ], false);
  }

  /* doesnt recongize the events data from smart table :P*/
  chooseOtpad(otpad: Event) {
    // @ts-ignore
    this.notpad.indeksniBroj = otpad.data.indeksniBroj;
    // @ts-ignore
    this.notpad.naziv = otpad.data.naziv;
    // @ts-ignore
    this.notpad.opis = otpad.data.naziv;
  }

  dodajOtpad(): void {
    this.skladisteService.dodajOtpad(this.notpad).subscribe();
  }

}
