import { Component, Inject, OnInit } from '@angular/core';
import { getDeepFromObject, NB_AUTH_OPTIONS } from '@nebular/auth';
import { Observable, of } from 'rxjs';
import { first } from 'rxjs/operators';
import { Delatnost } from '../../../@core/data/delatnost';
import { Firma } from '../../../@core/data/firma';
import { Korisnik } from '../../../@core/data/korisnik';
import { DelatnostService } from '../../../@core/service/delatnost.service';
import { MestoService } from '../../../@core/service/mesto.service';
import { RegisterService } from '../../../@core/service/register.service';

@Component({
  selector: 'ngx-register-firma',
  templateUrl: './register-firma.component.html',
  styleUrls: ['./register-firma.component.scss'],
})
export class RegisterFirmaComponent implements OnInit {
  constructor(@Inject(NB_AUTH_OPTIONS) protected options = {}, private mestoService: MestoService,
              private delatnostService: DelatnostService, private registerService: RegisterService) {
  }

  ngOnInit() {
    this.mestoService.getOpstine().pipe(first()).subscribe(o => {
      this.opstine = o;
      this.opstine$ = of(o);
    });
    this.delatnostService.getDelatnost().pipe(first()).subscribe(d => {
      this.delatnosti = d;
      this.delatnosti$ = of(d);
    });
    this.registerService.getKorisnik().subscribe(k => {
      if (k !== undefined) {
        this.korisnik = k;
      }
    });
    this.registerService.getFirma().subscribe(f => {
      if (f !== undefined) {
        this.firma = f;
        this.imeZakonskogZastupinka = this.firma.zakonskiZastupnik.split(' ')[0];
        this.prezimeZakonskogZastupinka = this.firma.zakonskiZastupnik.split(' ')[1];
      }
    });
    this.registerService.sendFirma(of(this.firma));
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
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

  findDelatnost(delatnost: string) {
    this.delatnosti$ = this.delatnostService.filter(delatnost, this.delatnosti);
  }

  spojIme(ime: string) {
    this.imeZakonskogZastupinka = ime;
    ime = ime + ' ';
    const index = this.firma.zakonskiZastupnik.indexOf(' ');
    this.firma.zakonskiZastupnik = this.firma.zakonskiZastupnik.slice(index);
    this.firma.zakonskiZastupnik = ime + this.firma.zakonskiZastupnik;
  }

  spojPrezime(prezime: string) {
    this.prezimeZakonskogZastupinka = prezime;
    prezime = ' ' + prezime;
    const index = this.firma.zakonskiZastupnik.indexOf(' ');
    this.firma.zakonskiZastupnik = this.firma.zakonskiZastupnik.slice(0, index);
    this.firma.zakonskiZastupnik = this.firma.zakonskiZastupnik + prezime;
  }

  delatnosti$: Observable<Delatnost[]>;
  delatnosti: Delatnost[];
  mesta$: Observable<string[]>;
  mesta: string[];
  opstine: string[];
  opstine$: Observable<string[]>;
  imeZakonskogZastupinka: string = '';
  prezimeZakonskogZastupinka: string = '';
  korisnik: Korisnik;

  firma: Firma = {
    _id: '',
    menadzer: '',
    radFirme: [],
    naziv: '',
    pib: '',
    mat: '',
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
    delatnost: {
      _id: '',
      sifra: '',
      naziv: '',
    },
    email: '',
    emailPrijem: '',
    faks: '',
    telefon: '',
    zakonskiZastupnik: '',
  };

}
