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
        this.brojVozila = this.firma.prevoznoSredstvo.length;
        this.brojDozvola = this.firma.dozvola.length;
        this.dozvole = this.firma.dozvola;
        this.vozila = this.firma.prevoznoSredstvo;
      }
    });
    this.registerService.sendFirma(of(this.firma));
  }

  updateDozvolaForm() {
    this.dozvole = new Array(this.brojDozvola);
    for (let i = 0; i < this.brojDozvola; i++) {
      this.dozvole[i] = {
        _id: '',
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

  chooseDozvola(dozvola: Dozvola): void {
    this.registerService.sendDozvola(of(dozvola.sifra));
    this.router.navigate(['/auth/register-dozvola']);
  }

  firma: Firma;
  brojDozvola: number = 0;
  dozvole: Dozvola[];
  brojVozila: number = 0;
  vozila: PrevoznoSredstvo[];
}
