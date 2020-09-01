import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getDeepFromObject, NB_AUTH_OPTIONS } from '@nebular/auth';
import { Observable, of } from 'rxjs';
import { first } from 'rxjs/operators';
import { Dozvola } from '../../../../../@core/data/dozvola';
import { Firma } from '../../../../../@core/data/firma';
import { Skladiste } from '../../../../../@core/data/skladiste';
import { MestoService } from '../../../../../@core/service/mesto.service';
import { RegisterService } from '../../../../../@core/service/register.service';

@Component({
  selector: 'ngx-skladistenje',
  templateUrl: './skladistenje.component.html',
  styleUrls: ['./skladistenje.component.scss'],
})
export class SkladistenjeComponent implements OnInit {

  mesta$: Observable<any>;
  mesta: any;
  opstine: any;
  opstine$: Observable<any>;
  firma: Firma;
  dozvole: Dozvola[];
  brojSkladista: number = 0;
  skladistaSkladistenje: Skladiste[];

  constructor(@Inject(NB_AUTH_OPTIONS) protected options = {}, private registerService: RegisterService,
              private mestoService: MestoService, private router: Router) {
  }

  ngOnInit(): void {
    this.registerService.getFirma().subscribe(f => {
      if (f !== undefined) {
        this.firma = f;
        if (f.skladisteSkladistenje !== undefined) {
          this.brojSkladista = this.firma.skladisteSkladistenje.length;
          this.skladistaSkladistenje = this.firma.skladisteSkladistenje;
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
    this.dozvole = new Array(this.brojSkladista);
    for (let i = 0; i < this.brojSkladista; i++) {
      this.dozvole[i] = {
        _id: '',
        naziv: 'Dozvola #' + i,
        datumNastanka: new Date(),
        datumTrajanja: new Date(),
        listaOtpada: [],
        skladistaTretman: undefined,
        sifra: '',
        vrstaDozvole: 'skladistenje',
      };
    }
    this.skladistaSkladistenje = new Array(this.brojSkladista);
    for (let i = 0; i < this.brojSkladista; i++) {
      this.skladistaSkladistenje[i] = {
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
        kolicina: 0,
        maxKolicina: NaN,
        naziv: '',
      };
    }
    this.firma.skladisteSkladistenje = this.skladistaSkladistenje;
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
