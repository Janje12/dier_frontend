import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { getDeepFromObject, NB_AUTH_OPTIONS } from '@nebular/auth';
import { NbComponentStatus, NbToastrService } from '@nebular/theme';
import { Korisnik } from '../../../@core/data/korisnik';
import { KorisnikService } from '../../../@core/service/korisnik.service';

@Component({
  selector: 'ngx-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {

  user: Korisnik = {
    _id: '', email: '', ime: '', korisnickoIme: '', prezime: '', sifra: '', telefon: '', uloga: '',
    firma: {
      _id: '',
      adresa: {mesto: undefined, ulica: ''},
      delatnost: undefined,
      email: '',
      emailPrijem: '',
      mat: '',
      menadzer: '',
      naziv: '',
      pib: '',
      radFirme: [],
      telefon: '',
      zakonskiZastupnik: '',
    },
  };

  constructor(private route: ActivatedRoute, private korisnikService: KorisnikService,
              @Inject(NB_AUTH_OPTIONS) protected options = {},
              private toastrService: NbToastrService, private router: Router  ) { }

  ngOnInit(): void {
    const korisnickoIme = this.route.snapshot.paramMap.get('korisnickoIme');
    this.korisnikService.findKorisnik(korisnickoIme, 'korisnickoIme').subscribe(u => {
      this.user = u;
    });
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }

  updateUser(form: NgForm): void {
    if (!form.valid)
      this.showToast('Greška', 'Informacije koje ste uneli nisu tačne!', 'danger');
    else {
      this.korisnikService.updateKorisnik(this.user).subscribe(u => {
      });
      this.showToast('Uspeh', 'Uspešno ste izmenili informacije!', 'success');
    }
  }

  private showToast(title: String, message: String, status: NbComponentStatus) {
    this.toastrService.show(
      message,
      title,
      {status});
  }

  gotoCompany(): void {
    this.router.navigate(['admin/firme', this.user.firma.pib]);
  }

}
