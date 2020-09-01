import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getDeepFromObject, NB_AUTH_OPTIONS } from '@nebular/auth';
import { of } from 'rxjs';
import { Dozvola } from '../../../../../@core/data/dozvola';
import { Firma } from '../../../../../@core/data/firma';
import { PrevoznoSredstvo } from '../../../../../@core/data/prevoznoSredstvo';
import { RegisterService } from '../../../../../@core/service/register.service';

@Component({
  selector: 'ngx-transport',
  templateUrl: './transport.component.html',
  styleUrls: ['./transport.component.scss'],
})
export class TransportComponent implements OnInit {

  firma: Firma;
  brojDozvola: number = 0;
  dozvole: Dozvola[];
  brojVozila: number = 0;
  vozila: PrevoznoSredstvo[];

  constructor(@Inject(NB_AUTH_OPTIONS) protected options = {}, private registerService: RegisterService,
              private router: Router) {
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }

  ngOnInit(): void {
    this.registerService.getFirma().subscribe(f => {
      if (f !== undefined) {
        this.firma = f;
        if (f.prevoznoSredstvo !== undefined) {
          this.brojVozila = this.firma.prevoznoSredstvo.length;
          this.vozila = this.firma.prevoznoSredstvo;
        }
        if (f.dozvola !== undefined) {
          this.dozvole = this.firma.dozvola;
          this.brojDozvola = this.firma.dozvola.length;
        }
      }
    });
    this.registerService.sendFirma(of(this.firma));
  }

  updateDozvolaForm() {
    this.dozvole = new Array(this.brojDozvola);
    for (let i = 0; i < this.brojDozvola; i++) {
      this.dozvole[i] = {
        _id: '',
        naziv: 'Dozvola #' + i,
        datumNastanka: new Date(),
        datumTrajanja: new Date(),
        listaOtpada: [],
        sifra: '',
        vrstaDozvole: 'transport',
      };
    }
    this.vozila = new Array(this.brojVozila);
    for (let i = 0; i < this.brojVozila; i++) {
      this.vozila[i] = {
        _id: '', registarskiBroj: '', vrstaVozila: '',
      };
    }
    this.firma.prevoznoSredstvo = this.vozila;
    this.firma.dozvola = this.dozvole;
  }

  dateValid(d: Dozvola): Boolean {
    if (d.datumNastanka > d.datumTrajanja)
      return true;
    return false;
  }

  chooseDozvola(dozvola: Dozvola): void {
    this.registerService.sendDozvola(of(dozvola.sifra));
    this.router.navigate(['/auth/register-dozvola']);
  }

}
