import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getDeepFromObject, NB_AUTH_OPTIONS } from '@nebular/auth';
import { Observable, of } from 'rxjs';
import { first } from 'rxjs/operators';
import { Dozvola } from '../../../../../@core/data/dozvola';
import { Firma } from '../../../../../@core/data/firma';
import { SkladisteTretman } from '../../../../../@core/data/skladisteTretman';
import { MestoService } from '../../../../../@core/service/mesto.service';
import { RegisterService } from '../../../../../@core/service/register.service';

@Component({
  selector: 'ngx-tretman',
  templateUrl: './tretman.component.html',
  styleUrls: ['./tretman.component.scss'],
})
export class TretmanComponent implements OnInit {

  mesta$: Observable<any>;
  mesta: any;
  opstine: any;
  opstine$: Observable<any>;
  firma: Firma;
  dozvole: Dozvola[];
  brojSkladistaTretman: number = 0;
  skladistaTretman: SkladisteTretman[];

  constructor(@Inject(NB_AUTH_OPTIONS) protected options = {}, private registerService: RegisterService,
              private mestoService: MestoService, private router: Router) {
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }

  ngOnInit(): void {
    this.registerService.getFirma().subscribe(f => {
      if (f !== undefined) {
        this.firma = f;
        this.brojSkladistaTretman = this.firma.skladistaTretman.length;
        this.dozvole = this.firma.dozvola;
        this.skladistaTretman = this.firma.skladistaTretman;
      }
    });
    this.registerService.sendFirma(of(this.firma));
    this.mestoService.getOpstine().pipe(first()).subscribe(o => {
      this.opstine = o;
      this.opstine$ = of(o);
    });
  }

  updateDozvolaForm() {
    this.dozvole = new Array(this.brojSkladistaTretman);
    for (let i = 0; i < this.brojSkladistaTretman; i++) {
      this.dozvole[i] = {
        _id: '',
        datumNastanka: new Date(),
        datumTrajanja: new Date(),
        listaOtpada: [],
        skladistaTretman: undefined,
        sifra: '',
        vrstaDozvole: 'tretman',
      };
    }
    this.skladistaTretman = new Array(this.brojSkladistaTretman);
    for (let i = 0; i < this.brojSkladistaTretman; i++) {
      this.skladistaTretman[i] = {
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
        geolokacijaE: 0,
        geolokacijaN: 0,
        kolicina: 0,
        maxKolicina: 0,
        naziv: '',
      };
    }
    this.firma.skladistaTretman = this.skladistaTretman;
    this.firma.dozvola = this.dozvole;
  }

  findOpstina(value: string) {
    this.mestoService.filter(value, this.opstine).subscribe(result => {
      this.opstine$ = of(result);
      this.getMesta(result[0]);
    });
  }

  private getMesta(nazivOpstine): void {
    if (nazivOpstine === undefined) return;
    this.mestoService.getNazivMesta(nazivOpstine).subscribe(m => {
      this.mesta = m;
      this.mesta$ = of(this.mesta);
    });
  }

  findMesta(value: string) {
    this.mestoService.filter(value, this.mesta).subscribe(result => {
      this.mesta$ = of(result);
    });
  }

  chooseDozvola(dozvola: Dozvola): void {
    this.registerService.sendDozvola(of(dozvola.sifra));
    this.router.navigate(['/auth/register-dozvola']);
  }

}
