import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NB_AUTH_OPTIONS, NbAuthService, NbResetPasswordComponent } from '@nebular/auth';

@Component({
  selector: 'reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent extends NbResetPasswordComponent implements OnInit {

  showPassword: string = 'eye';
  password: string = '';
  retypePassword: string = '';
  token: string = '';

  constructor(protected service: NbAuthService,
              @Inject(NB_AUTH_OPTIONS) protected options = {},
              protected cd: ChangeDetectorRef, protected router: Router,
              private activatedRoute: ActivatedRoute) {
    super(service, options, cd, router);
    this.strategy = this.getConfigValue('forms.login.strategy');
  }

  ngOnInit(): void {
    this.token = this.activatedRoute.snapshot.params['token'];
  }

  resetPassword(form: NgForm) {
    if (form.invalid)
      return;
    this.service.resetPassword(this.strategy, {password: this.password, token: this.token}).subscribe(x => {
      this.router.navigate(['login']);
    });
  }
}
