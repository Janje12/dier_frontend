import { Component, OnInit } from '@angular/core';
import { KatalogService } from '../../../@core/service/katalog.service';
import { LocalDataSource } from 'ng2-smart-table';
import { AOtpadService } from '../../../@core/service/aotpad.service';
import { AOtpad } from '../../../@core/data/aotpad';

@Component({
  selector: 'ngx-dodaj-otpad',
  styleUrls: ['./dodaj-otpad.component.scss'],
  templateUrl: './dodaj-otpad.component.html',
})
export class DodajOtpadComponent implements OnInit {

  constructor(private katalogService: KatalogService, private aotpadService: AOtpadService) {
  }

  ngOnInit(): void {
    this.katalogService.getKatalog().subscribe(k => {
      this.katalog.load(k);
    });
  }

  public katalog: LocalDataSource = new LocalDataSource();

  public settings = {
    hideSubHeader: true,
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

  aotpad: AOtpad = {
    _id: '',
    fizickoStanje: '',
    indeksniBroj: '',
    naziv: '',
    opis: '',
    kolicina: 0,
    komunalan: false,
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
    this.aotpad.indeksniBroj = otpad.data.indeksniBroj;
    // @ts-ignore
    this.aotpad.naziv = otpad.data.naziv;
    // @ts-ignore
    this.aotpad.opis = otpad.data.naziv;
  }

}
