import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getDeepFromObject, NB_AUTH_OPTIONS } from '@nebular/auth';
import { Observable, of } from 'rxjs';
import { first } from 'rxjs/operators';
import { Dozvola } from '../../../../../@core/data/dozvola';
import { Firma } from '../../../../../@core/data/firma';
import { SkladisteDeponija } from '../../../../../@core/data/skladisteDeponija';
import { MestoService } from '../../../../../@core/service/mesto.service';
import { RegisterService } from '../../../../../@core/service/register.service';

@Component({
  selector: 'ngx-odlaganje',
  templateUrl: './odlaganje.component.html',
  styleUrls: ['./odlaganje.component.scss'],
})
export class OdlaganjeComponent implements OnInit {

  mesta$: Observable<any>;
  mesta: any;
  opstine: any;
  opstine$: Observable<any>;
  firma: Firma;
  dozvole: Dozvola[];
  brojSkladistaDeponija: number = 0;
  skladisteDeponija: SkladisteDeponija[];

  constructor(@Inject(NB_AUTH_OPTIONS) protected options = {}, private registerService: RegisterService,
              private mestoService: MestoService, private router: Router, private datePipe: DatePipe) {
  }

  ngOnInit(): void {
    this.registerService.getFirma().subscribe(f => {
      if (f !== undefined) {
        this.firma = f;
        if (f.skladistaDeponija !== undefined) {
          this.brojSkladistaDeponija = this.firma.skladistaDeponija.length;
          this.skladisteDeponija = this.firma.skladistaDeponija;
        }
        if (f.dozvola !== undefined) {
          this.dozvole = this.firma.dozvola;
        }
      }
    });
    this.registerService.sendFirma(of(this.firma));
    this.mestoService.getOpstine().pipe(first()).subscribe(o => {
      this.opstine = o;
      this.opstine$ = of(o);
    });
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }

  updateDozvolaForm() {
    this.dozvole = new Array(this.brojSkladistaDeponija);
    for (let i = 0; i < this.brojSkladistaDeponija; i++) {
      this.dozvole[i] = {
        _id: '',
        naziv: 'Dozvola #' + i,
        datumNastanka: new Date(),
        datumTrajanja: new Date(),
        listaOtpada: [],
        skladistaTretman: undefined,
        sifra: '',
        vrstaDozvole: 'odlaganje',
      };
    }
    this.skladisteDeponija = new Array(this.brojSkladistaDeponija);
    for (let i = 0; i < this.brojSkladistaDeponija; i++) {
      this.skladisteDeponija[i] = {
        _id: '',
        adresa: {
          mesto:
            {
              opstinaNaziv: '',
              opstinaSifra: 0,
              mestoNaziv: '',
              mestoSifra: 0,
              postanskiBroj: '',
            }, ulica: '',
        },
        geolokacijaE: null,
        geolokacijaN: null,
        kolicina: 0,
        maxKolicina: NaN,
        naziv: '',
        vrstaDeponije: '',
      };
    }
    this.firma.skladistaDeponija = this.skladisteDeponija;
    this.firma.dozvola = this.dozvole;
  }

  dateValid(d: Dozvola): Boolean {
    if (d.datumNastanka > d.datumTrajanja)
      return true;
    return false;
  }

  private getMesta(nazivOpstine: string): void {
    if (nazivOpstine === undefined) return;
    this.mestoService.getNazivMesta(nazivOpstine).subscribe(m => {
      this.mesta = m;
      this.mesta$ = of(m);
    });
  }

  findOpstina(value: string) {
    if (value === '') {
      this.opstine$ = of(this.opstine);
      return;
    }
    this.mestoService.filter(value, this.opstine).subscribe(result => {
      this.opstine$ = of(result);
      this.getMesta(result[0]);
    });
  }

  findMesta(value: string) {
    this.mesta$ = this.mestoService.filter(value, this.mesta);
  }

  chooseDozvola(dozvola: Dozvola): void {
    this.registerService.sendDozvola(of(dozvola.sifra));
    this.router.navigate(['/auth/register-dozvola']);
  }

}
