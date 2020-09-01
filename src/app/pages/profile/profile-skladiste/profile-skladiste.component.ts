import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { getDeepFromObject, NB_AUTH_OPTIONS, NbAuthService } from '@nebular/auth';
import { NbComponentStatus, NbToastrService } from '@nebular/theme';
import { first } from 'rxjs/operators';
import { Skladiste } from '../../../@core/data/skladiste';
import { SkladisteService } from '../../../@core/service/skladiste.service';

@Component({
  selector: 'ngx-profile-skladiste',
  templateUrl: './profile-skladiste.component.html',
  styleUrls: ['./profile-skladiste.component.scss'],
})
export class ProfileSkladisteComponent implements OnInit {

  skladista: Skladiste[] = [];
  inputsDisabled: boolean = true;

  constructor(private skladisteService: SkladisteService,
              @Inject(NB_AUTH_OPTIONS) protected options = {},
              private toastrService: NbToastrService) {
  }

  ngOnInit(): void {
    this.skladisteService.getAllSkladistaFirme().pipe(first()).subscribe(s => {
      this.skladista = s;
    });
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }

  enableInputs(): void {
    this.inputsDisabled = false;
  }

  updateSkladiste(form: NgForm): void {
    if (!form.valid)
      this.showToast('Greška', 'Informacije koje ste uneli nisu tačne!', 'danger');
    else {
      this.skladista.forEach(s => this.skladisteService.updateSkladiste(s).subscribe(x => {
      }));
      this.showToast('Uspeh', 'Uspešno ste izmenili informacije!', 'success');
      this.inputsDisabled = true;
      // When korisnik data is changed it has to generate a new token!
    }
  }

  private showToast(title: String, message: String, status: NbComponentStatus) {
    this.toastrService.show(
      message,
      title,
      {status});
  }

  calculateStatus(skladiste: Skladiste): NbComponentStatus {
    if ((skladiste.kolicina / skladiste.maxKolicina) * 100 < 33)
      return 'success';
    else if ((skladiste.kolicina / skladiste.maxKolicina) * 100 < 66)
      return 'warning';
    else
      return 'danger';
  }

  calculateValue(skladiste: Skladiste): number {
    return (skladiste.kolicina / skladiste.maxKolicina) * 100;
  }

}
