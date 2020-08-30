import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbAuthService } from '@nebular/auth';
import { LocalDataSource } from 'ng2-smart-table';
import { Dozvola } from '../../../@core/data/dozvola';
import { NOtpad } from '../../../@core/data/notpad';
import { SkladisteDeponija } from '../../../@core/data/skladisteDeponija';
import { DozvolaService } from '../../../@core/service/dozvola.service';
import { NOtpadService } from '../../../@core/service/notpad.service';
import { SkladisteService } from '../../../@core/service/skladiste.service';

@Component({
  selector: 'ngx-dodaj-deponija',
  templateUrl: './dodaj-deponija.component.html',
  styleUrls: ['./dodaj-deponija.component.scss'],
})
export class DodajDeponijaComponent implements OnInit {

  katalog: LocalDataSource = new LocalDataSource();
  dozvola: Dozvola[];
  skladistaDeponija: SkladisteDeponija[];
  skladisteID: string;

  constructor(private dozvolaService: DozvolaService, private otpadService: NOtpadService,
              private router: Router, private authService: NbAuthService,
              private skladisteService: SkladisteService) {
  }

  ngOnInit(): void {
    this.dozvolaService.getDozvolaFrime().subscribe(d => {
      this.dozvola = d;
      this.updateKatalog(this.dozvola[0]);
    });
    this.skladisteService.getSkladisteDeponijaFirme().subscribe(x => {
      this.skladistaDeponija = x;
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

  updateKatalog(dozvola: Dozvola): void {
    this.skladisteID = dozvola.skladistaDeponija._id;
    this.katalog.load(dozvola.listaOtpada);
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
    this.notpad.tretman = true;
    this.otpadService.dodajNOtpad(this.notpad, this.skladisteID).subscribe();
    this.router.navigate(['pages', 'skladiste']);
  }
}
