import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NB_AUTH_OPTIONS, NbAuthResult, NbAuthService, NbRequestPasswordComponent } from '@nebular/auth';

@Component({
  selector: 'forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent extends NbRequestPasswordComponent implements OnInit {

  email: string = '';

  constructor(protected service: NbAuthService,
              @Inject(NB_AUTH_OPTIONS) protected options = {},
              protected cd: ChangeDetectorRef, protected router: Router) {
    super(service, options, cd, router);
    this.strategy = this.getConfigValue('forms.login.strategy');
  }

  ngOnInit(): void {
  }

  sendEmail(form: NgForm) {
    if (form.invalid)
      return;
      this.service.requestPassword(this.strategy, {'email': this.email}).subscribe((result: NbAuthResult) => {
        this.router.navigate(['login']);
      });
  }

}
