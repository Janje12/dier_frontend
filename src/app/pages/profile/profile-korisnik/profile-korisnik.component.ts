import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { getDeepFromObject, NB_AUTH_OPTIONS, NbAuthService } from '@nebular/auth';
import { NbComponentStatus, NbToastrService } from '@nebular/theme';
import { first } from 'rxjs/operators';
import { Korisnik } from '../../../../@core/data/korisnik';
import { KorisnikService } from '../../../../@core/service/korisnik.service';

@Component({
  selector: 'ngx-profile-korisnik',
  templateUrl: './profile-korisnik.component.html',
  styleUrls: ['./profile-korisnik.component.scss'],
})
export class ProfileKorisnikComponent implements OnInit {

  korisnik: Korisnik = {
    _id: '', email: '', ime: '', korisnickoIme: '', prezime: '', sifra: '', telefon: '', uloga: '',
  };
  inputsDisabled: boolean = true;

  constructor(private korisnikService: KorisnikService,
              @Inject(NB_AUTH_OPTIONS) protected options = {},
              private toastrService: NbToastrService,
              private authService: NbAuthService) {
  }

  ngOnInit(): void {
    this.korisnikService.getCurrentKorisnik().pipe(first()).subscribe(k => {
      this.korisnik = k;
    });
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }

  enableInputs(): void {
    this.inputsDisabled = false;
  }

  updateKorisnik(form: NgForm): void {
    if (!form.valid)
      this.showToast('Greška', 'Informacije koje ste uneli nisu tačne!', 'danger');
    else {
      this.korisnikService.updateKorisnik(this.korisnik).subscribe(k => {
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
