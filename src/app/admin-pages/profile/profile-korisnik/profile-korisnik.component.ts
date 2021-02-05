import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { getDeepFromObject, NB_AUTH_OPTIONS, NbAuthService } from '@nebular/auth';
import { NbComponentStatus, NbToastrService } from '@nebular/theme';
import { first } from 'rxjs/operators';
import { User } from '../../../@core/data/user';
import { RoleService } from '../../../@core/service/role.service';
import { UserService } from '../../../@core/service/user.service';

@Component({
  selector: 'ngx-profile-korisnik',
  templateUrl: './profile-korisnik.component.html',
  styleUrls: ['./profile-korisnik.component.scss'],
})
export class ProfileKorisnikComponent implements OnInit {

  korisnik: User = {
    email: '', firstName: '', lastName: '', password: '', phone: '', role: '', username: '',

  };
  inputsDisabled: boolean = true;

  constructor(private korisnikService: UserService,
              @Inject(NB_AUTH_OPTIONS) protected options = {},
              private toastrService: NbToastrService, private roleService: RoleService,
              private authService: NbAuthService) {
  }

  ngOnInit(): void {
    this.korisnikService.getUserProfile(this.roleService.getUsername()).pipe(first()).subscribe(k => {
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
      this.korisnikService.updateUser(this.korisnik, this.korisnik._id).subscribe(k => {
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
