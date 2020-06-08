import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NOtpadService } from '../../@core/service/notpad.service';
import { SkladisteService } from '../../@core/service/skladiste.service';
import { Skladiste } from '../../@core/data/skladiste';
import { NOtpad } from '../../@core/data/notpad';
import { NbWindowService } from '@nebular/theme';

@Component({
  selector: 'ngx-skladiste',
  templateUrl: './skladiste.component.html',
  styleUrls: ['./skladiste.component.css'],
})
export class SkladisteComponent implements OnInit {

  constructor(private skladisteService: SkladisteService, private windowService: NbWindowService,
              private notpadService: NOtpadService) {
  }

  public settings = {
    hideSubHeader: true,
    actions: {
      columnTitle: 'Dodaj na skladiste',
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
        editable: false,
      },
      naziv: {
        title: 'Naziv',
        filter: false,
        editable: false,
      },
      opis: {
        title: 'Opis',
        filter: false,
        editable: false,
      },
      kolicina: {
        title: 'Kolicina',
        filter: false,
      },
    },
  };
  public settings1 = {
    hideSubHeader: true,
    actions: {
      columnTitle: 'Dodaj na skladiste',
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
        editable: false,
      },
      naziv: {
        title: 'Naziv',
        filter: false,
        editable: false,
      },
      opis: {
        title: 'Opis',
        filter: false,
        editable: false,
      },
      kolicina: {
        title: 'Kolicina',
        filter: false,
      },
    },
  };
  public settings2 = {
    hideSubHeader: true,
    actions: {
      columnTitle: 'Dodaj na skladiste',
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
      naziv: {
        title: 'Naziv',
        filter: false,
        editable: false,
      },
      opis: {
        title: 'Opis',
        filter: false,
        editable: false,
      },
      kolicina: {
        title: 'Kolicina',
        filter: false,
      },
    },
  };

  skladista: Skladiste;

  ngOnInit(): void {
    this.updateSkladiste();
  }

  updateSkladiste(): void {
    this.skladisteService.getSkladiste().subscribe(x => {
      this.skladista = x;
    });
  }

  @ViewChild('dodajKolicinu', {read: TemplateRef}) dodajKolicinu: TemplateRef<HTMLElement>;

  tmpkolicina: number;
  tmp: NOtpad;

  dodajOtpad() {
    this.tmp.kolicina += this.tmpkolicina;
    this.notpadService.updateNOtpad(this.tmp).subscribe(x => {
      this.updateSkladiste();
    });
  }

  changeKolicina(notpad: NOtpad) {
    // @ts-ignore
    this.tmp = notpad.data;
    // @ts-ignore
    this.windowService.open(this.dodajKolicinu, {title: 'Dodaj proizvedenu kolicinu: ' + notpad.data.naziv});
  }

}
