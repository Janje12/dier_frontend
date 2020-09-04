import { Injectable, isDevMode } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Firma } from '../data/firma';
import { Korisnik } from '../data/korisnik';

@Injectable()
export class RegisterService {
  private korisnik$: Observable<Korisnik>;
  private korisnik: Korisnik;
  private firma$: Observable<Firma>;
  private firma: Firma;
  private operacije$: Observable<string[]>;
  private operacije: string[];
  private sifraDozvole: string;
  private sifraDozvole$: Observable<string>;


  constructor() {
    if (isDevMode()) {
      this.korisnik = {
        _id: '',
        email: 'random' + (Math.random() * 1000).toFixed(0) + '@gmail.com',
        ime: 'test',
        korisnickoIme: 'random' + (Math.random() * 1000).toFixed(0),
        prezime: 'test',
        sifra: 'nikjan00',
        telefon: (Math.random() * 10000000000).toFixed(0),
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
        email: 'random1' + (Math.random() * 1000).toFixed(0) + '@gmail',
        emailPrijem: 'random1@gmail',
        mat: (Math.random() * 100000000).toFixed(0),
        menadzer: 'random',
        naziv: 'Test',
        pib: (Math.random() * 1000000000).toFixed(0),
        radFirme: [],
        telefon: (Math.random() * 10000000000).toFixed(0),
        zakonskiZastupnik: 'Nikola Jankovic',
      };
    }
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
    }
    return of(this.firma);
  }
}
