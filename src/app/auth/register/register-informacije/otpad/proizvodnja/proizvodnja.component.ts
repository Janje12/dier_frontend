import { Component, Inject, OnInit } from '@angular/core';
import { getDeepFromObject, NB_AUTH_OPTIONS } from '@nebular/auth';
import { Observable, of } from 'rxjs';
import { first } from 'rxjs/operators';
import { Skladiste } from '../../../../../@core/data/skladiste';
import { MestoService } from '../../../../../@core/service/mesto.service';
import { RegisterService } from '../../../../../@core/service/register.service';

@Component({
  selector: 'ngx-proizvodnja',
  templateUrl: './proizvodnja.component.html',
  styleUrls: ['./proizvodnja.component.scss'],
})
export class ProizvodnjaComponent implements OnInit {

  constructor(@Inject(NB_AUTH_OPTIONS) protected options = {}, private registerService: RegisterService,
              private mestoService: MestoService) {
  }

  updateSkladisteForm() {
    this.skladista = new Array(this.brojSkladista);
    for (let i = 0; i < this.brojSkladista; i++) {
      this.skladista[i] = {
        _id: '',
        adresa: {
          mesto: {
            mestoSifra: 0,
            mestoNaziv: '',
            opstinaSifra: 0,
            opstinaNaziv: '',
            postanskiBroj: '',
          },
          ulica: '',
        },
        kolicina: 0,
        maxKolicina: 0,
        naziv: 'Skladiste #' + i,
      };
    }
    this.skladista$ = of(this.skladista);
    this.informacije.skladista = this.skladista;
  }

  ngOnInit(): void {
    this.registerService.getInformacije().subscribe(i => {
      if (i !== undefined) {
        this.informacije = i;
        this.brojSkladista = this.informacije.skladista.length;
        this.skladista = this.informacije.skladista;
        this.skladista$ = of(this.skladista);
      }
    });
    if (this.informacije === undefined) {
      this.informacije = {
        skladista: [],
      };
    }
    this.registerService.sendInformacije(of(this.informacije));
    this.mestoService.getOpstine().pipe(first()).subscribe(o => {
      this.opstine = o;
      this.opstine$ = of(o);
    });
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
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

  mesta$: Observable<any>;
  mesta: any;
  opstine: any;
  opstine$: Observable<any>;
  brojSkladista: number = 0;
  skladista: Skladiste[];
  skladista$: Observable<Skladiste[]>;
  informacije: {
    skladista: Array<Skladiste>;
  };
}
