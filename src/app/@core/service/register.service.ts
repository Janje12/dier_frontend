import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Firma } from '../data/firma';
import { Korisnik } from '../data/korisnik';
import { Skladiste } from '../data/skladiste';

@Injectable()
export class RegisterService {
  private korisnik$: Observable<Korisnik>;
  private korisnik: Korisnik;
  private firma$: Observable<Firma>;
  private firma: Firma;
  private operacije$: Observable<string[]>;
  private operacije: string[];
  private informacije$: Observable<{
    skladista: Skladiste[];
  }>;
  private informacije: {
    skladista: Skladiste[];
  };
  private sifraDozvole: string;
  private sifraDozvole$: Observable<string>;


  constructor() {
   /* this.korisnik = {
      _id: '',
      email: 'test@gmail.com',
      ime: 'test',
      korisnickoIme: 'test12',
      prezime: 'test',
      sifra: 'nikjan00',
      telefon: '068456784',
      uloga: 'menadzer',
    };
    this.firma = {
      _id: '',
      adresa: {
        mesto: {
          mestoSifra: 0,
          mestoNaziv: 'Arnajevo',
          opstinaSifra: 0,
          opstinaNaziv: 'Beograd',
          postanskiBroj: '31210',
        }, ulica: 'Nikola tesla 2',
      },
      delatnost: {
        _id: '',
        sifra: '',
        naziv: 'Proizvodnja mesnih prerađevina',
      },
      email: 'test12@gmail',
      emailPrijem: 'test12@gmail',
      mat: '12121212',
      menadzer: 'test12',
      naziv: 'Test',
      pib: '123123123',
      radFirme: [],
      telefon: '011654789',
      zakonskiZastupnik: 'Nikola Jankovic',

    };*/
  }


  sendDozvola(sifraDozvole: Observable<string>): void {
    this.sifraDozvole$ = sifraDozvole;
    sifraDozvole.subscribe(d => {
      this.sifraDozvole = d;
    });
  }

  getDozvola(): Observable<string> {
    return of(this.sifraDozvole);
  }

  sendInformacije(informacije: Observable<any>): void {
    this.informacije$ = informacije;
    informacije.subscribe(i => {
      this.informacije = i;
    });
  }

  getInformacije(): Observable<any> {
    return of(this.informacije);
  }

  sendOperacije(operacije: Observable<string[]>): void {
    this.operacije$ = operacije;
    operacije.subscribe(o => {
      this.operacije = o;
    });
  }

  getOperacije(): Observable<string[]> {
    return of(this.operacije);
  }

  sendKorisnik(korisnik: Observable<Korisnik>): void {
    this.korisnik$ = korisnik;
    korisnik.subscribe(k => {
      this.korisnik = k;
    });
  }

  getKorisnik(): Observable<Korisnik> {
    if (this.firma !== undefined && this.korisnik !== undefined) {
      this.korisnik.firma = this.firma;
    }
    return of(this.korisnik);
  }

  sendFirma(firma: Observable<Firma>): void {
    this.firma$ = firma;
    firma.subscribe(f => {
      this.firma = f;
    });
  }

  getFirma(): Observable<Firma> {
    if (this.firma !== undefined) {
      if (this.operacije !== undefined) {
        this.firma.radFirme = this.operacije;
      }
      if (this.korisnik !== undefined) {
        this.firma.menadzer = this.korisnik.korisnickoIme;
      }
      if (this.informacije !== undefined) {
        this.firma.skladista = this.informacije.skladista;
      }
    }

    return of(this.firma);
  }
}
