import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NbWindowService } from '@nebular/theme';
import { NOtpad } from '../../../@core/data/notpad';
import { SkladisteDeponija } from '../../../@core/data/skladisteDeponija';
import { NOtpadService } from '../../../@core/service/notpad.service';
import { SkladisteService } from '../../../@core/service/skladiste.service';
import { SKLADISTE_PROIZVODNJA_SETTINGS } from '../skladiste-proizvodnja/skladisteProizvodnja.settings';

@Component({
  selector: 'ngx-skladiste-deponija',
  templateUrl: './skladiste-deponija.component.html',
  styleUrls: ['./skladiste-deponija.component.scss'],
})
export class SkladisteDeponijaComponent implements OnInit {
  @ViewChild('dodajKolicinu', {read: TemplateRef}) dodajKolicinu: TemplateRef<HTMLElement>;

  skladisteDeponija: SkladisteDeponija[];
  otpad: NOtpad;
  otpadKolicina: number;
  settings: any = SKLADISTE_PROIZVODNJA_SETTINGS;

  constructor(private skladisteService: SkladisteService, private windowService: NbWindowService,
              private notpadService: NOtpadService) {
  }

  ngOnInit() {
    this.updateSkladiste();
  }

  updateSkladiste(): void {
    this.skladisteService.getSkladisteDeponijaFirme().subscribe(x => {
      this.skladisteDeponija = x;
      this.mergeOtpads();
    });
  }

  mergeOtpads() {
    if (this.skladisteDeponija !== undefined) {
      for (const s of this.skladisteDeponija) {
        s.neopasniOtpad = s.neopasniOtpad.concat(<NOtpad[]>s.opasniOtpad);
      }
    }
  }

  dodajOtpad() {
    this.otpad.kolicina += this.otpadKolicina;
    this.notpadService.updateNOtpad(this.otpad).subscribe(x => {
      // dodaj otpad i azuriraj tabelu
      this.updateSkladiste();
    });
  }

  changeKolicina(data: any) {
    // otvori prozor za dodavanje kolicine na otpad
    const notpad: NOtpad = data.data;
    this.otpad = notpad;
    this.windowService.open(this.dodajKolicinu, {title: 'Dodaj preuzetu kolicinu: ' + notpad.naziv});
  }

}
