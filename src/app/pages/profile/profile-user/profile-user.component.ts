import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { getDeepFromObject, NB_AUTH_OPTIONS, NbAuthService } from '@nebular/auth';
import { NbButtonComponent, NbComponentStatus, NbToastrService } from '@nebular/theme';
import { first } from 'rxjs/operators';
import { User } from '../../../@core/data/user';
import { RoleService } from '../../../@core/service/role.service';
import { UserService } from '../../../@core/service/user.service';

@Component({
  selector: 'profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.scss'],
})
export class ProfileUserComponent implements OnInit {

  showPassword: string = 'eye';
  oldPassword: string = '';
  newPassword: string = '';
  retypePassword: string = '';
  user: User = {
    email: '', firstName: '', lastName: '', password: '', phone: '', role: '', username: '',
  };
  inputsDisabled: boolean = true;

  constructor(private userService: UserService,
              @Inject(NB_AUTH_OPTIONS) protected options = {},
              private toastrService: NbToastrService, private roleService: RoleService,
              private authService: NbAuthService) {
  }

  ngOnInit(): void {
    this.userService.getUserProfile(this.roleService.getUsername()).pipe(first()).subscribe(k => {
      this.user = k;
    });
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }

  enableInputs(): void {
    this.inputsDisabled = false;
  }

  setNewPassword(button: NbButtonComponent) {
    if (this.oldPassword === this.newPassword) {
      this.showToast('Greška', 'Stara šifra ne sme da se podudara sa novom šifrom!', 'danger');
      return;
    }
    button.disabled = true;
    this.userService.changePassword(this.user._id, this.oldPassword, this.newPassword).subscribe(x => {
      if (x)
        this.showToast('Uspeh', 'Uspešno ste promenili šifru!', 'success');
      else
        this.showToast('Greška', 'Proverite šifru!', 'danger');
    }, (err) => {
      this.showToast('Greška', 'Proverite šifru!', 'danger');
    });
    button.disabled = false;
  }

  updateUser(form: NgForm): void {
    if (!form.valid)
      this.showToast('Greška', 'Informacije koje ste uneli nisu tačne!', 'danger');
    else {
      this.userService.updateUser(this.user, this.user.username, 'username').subscribe(k => {
      });
      this.showToast('Uspeh', 'Uspešno ste izmenili informacije!', 'success');
      this.inputsDisabled = true;
      // When user data is changed it has to generate a new token!
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
