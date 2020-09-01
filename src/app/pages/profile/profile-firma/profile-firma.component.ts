import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { getDeepFromObject, NB_AUTH_OPTIONS, NbAuthService } from '@nebular/auth';
import { NbComponentStatus, NbToastrService } from '@nebular/theme';
import { first } from 'rxjs/operators';
import { Firma } from '../../../@core/data/firma';
import { Korisnik } from '../../../@core/data/korisnik';
import { FirmaService } from '../../../@core/service/firma.service';
import { KorisnikService } from '../../../@core/service/korisnik.service';

@Component({
  selector: 'ngx-profile-firma',
  templateUrl: './profile-firma.component.html',
  styleUrls: ['./profile-firma.component.scss'],
})
export class ProfileFirmaComponent implements OnInit {

  firma: Firma = {
    _id: '',
    adresa: {
      mesto: {
        opstinaNaziv: '',
        opstinaSifra: 0,
        mestoNaziv: '',
        mestoSifra: 0,
        postanskiBroj: '',
      }, ulica: '',
    },
    delatnost: {
      sifra: '',
      naziv: '',
      _id: '',
    },
    email: '',
    emailPrijem: '',
    mat: '',
    menadzer: '',
    naziv: '',
    pib: '',
    radFirme: [],
    telefon: '',
    zakonskiZastupnik: '',
  };
  inputsDisabled: boolean = true;

  constructor(private firmaService: FirmaService,
              @Inject(NB_AUTH_OPTIONS) protected options = {},
              private toastrService: NbToastrService,
              private authService: NbAuthService) {
  }

  ngOnInit(): void {
    this.firmaService.getCurrentFirma().pipe(first()).subscribe(f => {
      this.firma = f;
    });
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }

  enableInputs(): void {
    this.inputsDisabled = false;
  }

  updateFirma(form: NgForm): void {
    if (!form.valid)
      this.showToast('Greška', 'Informacije koje ste uneli nisu tačne!', 'danger');
    else {
      this.firmaService.updateFirma(this.firma).subscribe(f => {
      });
      this.showToast('Uspeh', 'Uspešno ste izmenili informacije!', 'success');
      this.inputsDisabled = true;
      // When korisnik data is changed it has to generate a new token!
      let token = null;
      this.authService.getToken().subscribe(t => {
        token = t;
      });
      this.authService.refreshToken('email', token).subscribe(x => {
      });
    }
  }

  private showToast(title: String, message: String, status: NbComponentStatus) {
    this.toastrService.show(
      message,
      title,
      {status});
  }


}
