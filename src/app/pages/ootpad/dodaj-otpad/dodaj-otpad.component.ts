import { Component, OnInit } from '@angular/core';
import { KatalogService } from '../../../@core/service/katalog.service';
import { LocalDataSource } from 'ng2-smart-table';
import { OOtpad } from '../../../@core/data/ootpad';
import { OOtpadService } from '../../../@core/service/ootpad.service';

@Component({
  selector: 'ngx-dodaj-otpad',
  styleUrls: ['./dodaj-otpad.component.scss'],
  templateUrl: './dodaj-otpad.component.html',
})
export class DodajOtpadComponent implements OnInit {

  constructor(private katalogService: KatalogService, private ootpadService: OOtpadService) {
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

  ootpad: OOtpad = {
    _id: '',
    cLista: '',
    cas: '',
    fizickoStanje: '',
    hLista: '',
    kgMaterije: 0,
    yLista: '',
    naziv: '',
    opis: '',
    indeksniBroj: '',
    kolicina: 0,
    hemijskiNaziv: '',
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

  /*doesnt recongize the events data from smart table :P*/
  chooseOtpad(otpad: Event) {
    // @ts-ignore
    this.ootpad.indeksniBroj = otpad.data.indeksniBroj;
    // @ts-ignore
    this.ootpad.naziv = otpad.data.naziv;
    // @ts-ignore
    this.ootpad.opis = otpad.data.naziv;
  }

}
