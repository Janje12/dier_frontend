import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Skladiste } from '../../../@core/data/skladiste';
import { KatalogService } from '../../../@core/service/katalog.service';
import { LocalDataSource } from 'ng2-smart-table';
import { OOtpad } from '../../../@core/data/ootpad';
import { OOtpadService } from '../../../@core/service/ootpad.service';
import { SkladisteService } from '../../../@core/service/skladiste.service';

@Component({
  selector: 'ngx-dodaj-otpad',
  styleUrls: ['./dodaj-otpad.component.scss'],
  templateUrl: './dodaj-otpad.component.html',
})
export class DodajOtpadComponent implements OnInit {

  constructor(private katalogService: KatalogService, private opasniOtpadService: OOtpadService,
              private skladisteService: SkladisteService, private router: Router) {
  }

  ngOnInit(): void {
    this.katalogService.getOpasanKatalog().subscribe(k => {
      this.katalog.load(k);
    });
    this.skladisteService.getSkladisteFirme().subscribe(x => {
      this.skladista = x;
    });
  }

  public katalog: LocalDataSource = new LocalDataSource();

  skladista: Skladiste[];
  skladisteID: string;
  fizickaStanja: string[] = ['Čvrsto', 'Tečno', 'Gasovito', 'Prah'];

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


  dodajOtpad(): void {
    this.opasniOtpadService.dodajOOtpad(this.ootpad, this.skladisteID).subscribe();
    this.router.navigate(['pages', 'skladiste']);
  }

}
