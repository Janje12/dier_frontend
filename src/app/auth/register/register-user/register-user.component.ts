import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { getDeepFromObject, NB_AUTH_OPTIONS } from '@nebular/auth';
import { NbComponentStatus, NbToastrService } from '@nebular/theme';
import { of } from 'rxjs';
import { first } from 'rxjs/operators';
import { User } from '../../../@core/data/user';
import { RegisterService } from '../../../@core/service/register.service';

@Component({
  selector: 'register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss'],
})
export class RegisterUserComponent implements OnInit {

  showPassword: string = 'eye';
  checkIssues: boolean = false;
  retypePassword: '';
  user: User = {
    email: '', firstName: '', lastName: '', password: '', phone: '', role: 'manager', username: '', company: null,
  };

  constructor(@Inject(NB_AUTH_OPTIONS) protected options = {}, private registerService: RegisterService,
              private router: Router, private toastrService: NbToastrService) {
  }

  ngOnInit(): void {
    this.registerService.getUser().pipe(first()).subscribe(k => {
      if (k !== undefined)
        this.user = k;
    });
    this.registerService.sendUser(of(this.user));
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }

  async validateUser(form: NgForm) {
    if (form.invalid) {
      this.checkIssues = true;
      this.showToast('Greška', 'Ispravite greške da bi ste nastavili.', 'warning');
      return false;
    }
    let text = '';
    const test = await Promise.all(this.registerService.checkUser(this.user)).then(b => {
      text = !b[0] ? 'to korisničko ime' : text;
      text = !b[1] ? 'taj telefon' : text;
      text = !b[2] ? 'taj email' : text;
      return b[0] && b[1] && b[2];
    });
    if (!test) {
      this.checkIssues = true;
      this.showToast('Greška', `Već postoji ${text}!`, 'danger');
      return;
    }
    if (form.valid && this.retypePassword === this.user.password) {
      this.router.navigate(['auth/register-company']);
    } else {
      this.checkIssues = true;
      this.showToast('Greška', 'Ispravite greške da bi ste nastavili.', 'warning');
    }
  }

  private showToast(title: String, message: String, status: NbComponentStatus) {
    this.toastrService.show(
      message,
      title,
      {status});
  }

}
