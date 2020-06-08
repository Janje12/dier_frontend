import { Component, OnInit } from '@angular/core';
import { KatalogService } from '../../../@core/service/katalog.service';
import { LocalDataSource } from 'ng2-smart-table';
import { PTOtpad } from '../../../@core/data/ptotpad';
import { PTOtpadService } from '../../../@core/service/ptotpad.service';

@Component({
  selector: 'ngx-dodaj-otpad',
  styleUrls: ['./dodaj-otpad.component.scss'],
  templateUrl: './dodaj-otpad.component.html',
})
export class DodajOtpadComponent implements OnInit {

  constructor(private katalogService: KatalogService, private ptotpadService: PTOtpadService) {
  }

  ngOnInit(): void {
    this.katalogService.getKatalog().subscribe(k => {
      this.katalog.load(k);
    });
  }

  public katalog: LocalDataSource = new LocalDataSource();

  public settings = {
    actions: {
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

  ptotpad: PTOtpad = {
    _id: '',
    cLista: '',
    cas: '',
    fizickoStanje: '',
    hLista: '',
    hemijskiNaziv: '',
    kgMaterije: 0, yLista: '',
    naziv: '',
    opis: '',
    indeksniBroj: '',
    kolicina: 0,
    masa: 0,
    jedinicaMere: '',
  };

  onSearch(query: string = '') {
    this.katalog.setFilter([
      // fields we want to include in the search
      {
        field: 'indeksniBroj',
        search: query,
      },
    ], false);
  }

  chooseOtpad(otpad: Event) {
    // @ts-ignore
    this.ptotpad.indeksniBroj = otpad.data.indeksniBroj;
    // @ts-ignore
    this.ptotpad.naziv = otpad.data.naziv;
    // @ts-ignore
    this.ptotpad.opis = otpad.data.naziv;
  }

}
