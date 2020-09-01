import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { getDeepFromObject, NB_AUTH_OPTIONS } from '@nebular/auth';
import { NbComponentStatus, NbToastrService } from '@nebular/theme';
import { first } from 'rxjs/operators';
import { PrevoznoSredstvo } from '../../../@core/data/prevoznoSredstvo';
import { PrevoznoSredstvoService } from '../../../@core/service/prevoznoSredstvo.service';

@Component({
  selector: 'ngx-profile-prevozno-sredstvo',
  templateUrl: './profile-prevozno-sredstvo.component.html',
  styleUrls: ['./profile-prevozno-sredstvo.component.scss'],
})
export class ProfilePrevoznoSredstvoComponent implements OnInit {

  prevoznoSredstvo: PrevoznoSredstvo[] = [];
  inputsDisabled: boolean = true;

  constructor(private prevoznoSredstvoService: PrevoznoSredstvoService,
              @Inject(NB_AUTH_OPTIONS) protected options = {},
              private toastrService: NbToastrService) {
  }

  ngOnInit(): void {
    this.prevoznoSredstvoService.getPrevoznoSredstvoFirme().pipe(first()).subscribe(s => {
      this.prevoznoSredstvo = s;
    });
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }

  enableInputs(): void {
    this.inputsDisabled = false;
  }

  updatePrevoznoSredstvo(form: NgForm): void {
    if (!form.valid)
      this.showToast('Greška', 'Informacije koje ste uneli nisu tačne!', 'danger');
    else {
      this.prevoznoSredstvo.forEach(p => this.prevoznoSredstvoService.updatePrevoznoSredstvo(p).subscribe(x => {
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

}
