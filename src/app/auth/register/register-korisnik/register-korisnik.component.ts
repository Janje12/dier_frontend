import { Component, Inject, OnInit } from '@angular/core';
import { getDeepFromObject, NB_AUTH_OPTIONS } from '@nebular/auth';
import { of } from 'rxjs';
import { Korisnik } from '../../../@core/data/korisnik';
import { RegisterService } from '../../../@core/service/register.service';

@Component({
  selector: 'ngx-register-korisnik',
  templateUrl: './register-korisnik.component.html',
  styleUrls: ['./register-korisnik.component.scss'],
})
export class RegisterKorisnikComponent implements OnInit {

  constructor(@Inject(NB_AUTH_OPTIONS) protected options = {}, private registerService: RegisterService) {
  }

  ngOnInit(): void {
    this.registerService.getKorisnik().subscribe(k => {
      if (k !== undefined)
        this.korisnik = k;
    });
    this.registerService.sendKorisnik(of(this.korisnik));
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }

  reSifra: '';
  korisnik: Korisnik = {
    _id: '',
    ime: '',
    prezime: '',
    korisnickoIme: '',
    sifra: '',
    email: '',
    telefon: '',
    uloga: 'menadzer',
  };


}
