import { Component, Inject, OnInit } from '@angular/core';
import { getDeepFromObject, NB_AUTH_OPTIONS } from '@nebular/auth';
import { Observable, of } from 'rxjs';
import { first } from 'rxjs/operators';
import { Delatnost } from '../../../@core/data/delatnost';
import { Firma } from '../../../@core/data/firma';
import { Korisnik } from '../../../@core/data/korisnik';
import { Mesto } from '../../../@core/data/mesto';
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
    this.registerService.getFirma(of(this.firma));
    this.registerService.sendKorisnik().subscribe(x => {
      this.korisnik = x;
    });
  }

  private getMesta(nazivOpstine): void {
    this.mestoService.getNazivMesta(nazivOpstine[0]._id).subscribe(m => {
      this.mesta = m;
      this.mesta$ = of(this.mesta);
    });
  }


  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }

  private filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.opstine.filter(x => x._id.toLowerCase().includes(filterValue));
  }

  onModelChange(value: string) {
    value.toLowerCase();
    this.opstine$ = of(this.filter(value));
    this.getMesta(this.filter(value));
  }

  private filter2(value: string): Mesto[] {
    const filterValue = value.toLowerCase();
    return this.mesta.filter(x => x.mesto.naziv.toLowerCase().includes(filterValue)
      && x.opstina.naziv === this.firma.adresa.mesto.opstina.naziv);
  }

  onModelChange2(value: string) {
    value.toLowerCase();
    this.mesta$ = of(this.filter2(value));
  }

  private filter3(value: string): Delatnost[] {
    const filterValue = value.toLowerCase();
    return this.delatnosti.filter(x => x.naziv.includes(filterValue));
  }

  onModelChange3(value: string) {
    value.toLowerCase();
    this.delatnosti$ = of(this.filter3(value));
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
  mesta$: Observable<any>;
  mesta: any;
  opstine: any;
  opstine$: Observable<any>;
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
        _id: '',
        mesto: {
          sifra: 0,
          naziv: '',
        },
        opstina: {
          sifra: 0,
          naziv: '',
        },
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
