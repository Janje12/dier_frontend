import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbAuthService } from '@nebular/auth';
import { Observable, of } from 'rxjs';
import { Skladiste } from '../../../@core/data/skladiste';
import { KatalogService } from '../../../@core/service/katalog.service';
import { LocalDataSource } from 'ng2-smart-table';
import { NOtpad } from '../../../@core/data/notpad';
import { NOtpadService } from '../../../@core/service/notpad.service';
import { SkladisteService } from '../../../@core/service/skladiste.service';

@Component({
  selector: 'ngx-dodaj-otpad',
  styleUrls: ['./dodaj-otpad.component.scss'],
  templateUrl: './dodaj-otpad.component.html',
})
export class DodajOtpadComponent implements OnInit {

  constructor(private katalogService: KatalogService, private otpadService: NOtpadService,
              private router: Router, private authService: NbAuthService,
              private skladisteService: SkladisteService) {
  }

  /*
    Observable and async cause too many issues.
   */
  ngOnInit(): void {
    this.katalogService.getNeopasanKatalog().subscribe(k => {
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
    this.otpadService.dodajNOtpad(this.notpad, this.skladisteID).subscribe();
    this.router.navigate(['pages', 'skladiste']);
  }

}
