import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NbWindowService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { NOtpad } from '../../../@core/data/notpad';
import { OOtpad } from '../../../@core/data/ootpad';
import { SkladisteTretman } from '../../../@core/data/skladisteTretman';
import { KatalogService } from '../../../@core/service/katalog.service';
import { NOtpadService } from '../../../@core/service/notpad.service';
import { SkladisteService } from '../../../@core/service/skladiste.service';
import { SKLADISTE_PROIZVODNJA_SETTINGS } from '../skladiste-proizvodnja/skladisteProizvodnja.settings';
import { SKLADISTE_SETTINGS } from '../skladiste-settings';
import { SKLADISTE_TRETMAN_SETTINGS } from './skladisteTretman.settings';

@Component({
  selector: 'ngx-skladiste-tretman',
  templateUrl: './skladiste-tretman.component.html',
  styleUrls: ['./skladiste-tretman.component.scss'],
})
export class SkladisteTretmanComponent implements OnInit {
  @ViewChild('treatTrashTemplate', {read: TemplateRef}) treatTrashTemplate: TemplateRef<HTMLElement>;
  @ViewChild('addTrashTemplate', {read: TemplateRef}) addTrashTemplate: TemplateRef<HTMLElement>;

  skladistaTretman: SkladisteTretman[];
  currSkladiste: SkladisteTretman;
  otpadTretman: NOtpad[];
  otpadOstatak: NOtpad[];
  otpad: NOtpad;
  otpadKojiNastaje: NOtpad[] = [];
  otpadKolicina: number;
  settings: any = SKLADISTE_TRETMAN_SETTINGS;
  settingsProduction: any = SKLADISTE_PROIZVODNJA_SETTINGS;
  settingsKatalog: any = SKLADISTE_SETTINGS;
  katalog: LocalDataSource = new LocalDataSource();

  constructor(private skladisteService: SkladisteService, private windowService: NbWindowService,
              private notpadService: NOtpadService, private katalogService: KatalogService) {
  }

  ngOnInit() {
    this.katalogService.getKatalog().subscribe(k => {
      this.katalog.load(k);

    });
    this.updateSkladiste();
  }

  updateSkladiste(): void {
    this.skladisteService.getSkladisteTretmanFirme().subscribe(x => {
      this.skladistaTretman = x;
      this.organizeTrash();
    });
  }

  organizeTrash() {
    if (this.skladistaTretman !== undefined) {
      for (const s of this.skladistaTretman) {
        s.neopasniOtpad = s.neopasniOtpad.concat(<NOtpad[]>s.opasniOtpad);
        s.opasniOtpad = <OOtpad[]>s.neopasniOtpad.filter(x => !x.tretman);
        s.neopasniOtpad = s.neopasniOtpad.filter(x => x.tretman);
      }
    }
  }

  onSearch(query: string = '') {
    this.katalog.setFilter([
      {
        field: 'indeksniBroj',
        search: query,
      },
    ], false);
  }

  obradiOtpad() {
    this.otpad.kolicina -= this.otpadKolicina;
    this.notpadService.updateNOtpad(this.otpad, this.currSkladiste._id).subscribe();
    this.otpadKojiNastaje.forEach(x => {
      x.opis = x.naziv;
      x.tretman = false;
      this.notpadService.dodajNOtpad(x, this.currSkladiste._id).subscribe();
    });
    this.updateSkladiste();
  }

  dodajOtpad() {
    this.otpad.kolicina += this.otpadKolicina;
    this.notpadService.updateNOtpad(this.otpad, this.currSkladiste._id).subscribe(x => {
      // dodaj otpad i azuriraj tabelu
      this.updateSkladiste();
    });
  }

  chooseOtpad(data: any) {
    // @ts-ignore
    let otpad = data;
    if (data.data !== undefined)
      otpad = data.data;
    if (this.otpadKojiNastaje.some(x => x._id === otpad._id)) {
      this.removeOtpad(otpad);
    } else {
      this.otpadKojiNastaje.push(otpad);
    }
  }

  removeOtpad(otpad: any) {
    const found = this.otpadKojiNastaje.filter(x => x._id === otpad._id)[0];
    if (found) {
      const index = this.otpadKojiNastaje.indexOf(found, 0);
      if (index > -1)
        this.otpadKojiNastaje.splice(index, 1);
    }
  }

  treatTrash(data: any, skladiste: SkladisteTretman) {
    // otvori prozor za dodavanje kolicine na otpad
    this.currSkladiste = skladiste;
    const otpad: NOtpad = data.data;
    this.otpad = otpad;
    this.windowService.open(this.treatTrashTemplate, {title: 'Preradi određenu kolicinu: ' + otpad.naziv});
  }

  addTrash(data: any, skladiste: SkladisteTretman) {
    // otvori prozor za dodavanje kolicine na otpad
    this.currSkladiste = skladiste;
    const otpad: NOtpad = data.data;
    this.otpad = otpad;
    this.windowService.open(this.treatTrashTemplate, {title: 'Preradi određenu kolicinu: ' + otpad.naziv});
  }


}
