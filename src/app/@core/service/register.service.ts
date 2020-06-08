import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Firma } from '../data/firma';
import { Korisnik } from '../data/korisnik';

@Injectable()
export class RegisterService {
  private korisnik: Korisnik;
  private firma: Firma;
  private operacije: string[];
  private informacije: any;

  getInformacije(informacije: Observable<any>): void {
    informacije.subscribe(i => {
      this.informacije = i;
    });
  }

  sendInformacije(): Observable<any> {
    return of(this.informacije);
  }

  getOperacije(operacije: Observable<string[]>): void {
    operacije.subscribe(o => {
      this.operacije = o;
    });
  }

  sendOperacije(): Observable<string[]> {
    return of(this.operacije);
  }

  getKorisnik(korisnik: Observable<Korisnik>): void {
    korisnik.subscribe(x => {
      this.korisnik = x;
    });
  }

  sendKorisnik(): Observable<Korisnik> {
    this.korisnik.firma = this.firma;
    return of(this.korisnik);
  }

  getFirma(firma: Observable<Firma>): void {
    firma.subscribe(x => {
      this.firma = x;
    });
  }

  sendFirma(): Observable<Firma> {
    this.firma.menadzer = this.korisnik.korisnickoIme;
    this.firma.radFirme = this.operacije;
    this.firma.skladista = this.informacije;
    return of(this.firma);
  }
}
