import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NB_AUTH_OPTIONS, NbAuthResult, NbAuthService, NbRequestPasswordComponent } from '@nebular/auth';
import { ToastrService } from '../../@core/service/toastr.service';

@Component({
  selector: 'forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent extends NbRequestPasswordComponent {

  email: string = '';

  constructor(protected service: NbAuthService, @Inject(NB_AUTH_OPTIONS) protected options = {},
              protected cd: ChangeDetectorRef, protected router: Router, private toastrService: ToastrService) {
    super(service, options, cd, router);
    this.strategy = this.getConfigValue('forms.login.strategy');
  }

  sendEmail(form: NgForm) {
    if (form.invalid) {
      this.toastrService.showToast('Greška', 'Popravite greške.', 'warning');
      return;
    }
    this.service.requestPassword(this.strategy, {'email': this.email}).subscribe((result: NbAuthResult) => {
      if (!result.isSuccess())
        this.toastrService.showToast('Greška', 'Došlo je do greške, pokušajte kasnije.', 'warning');
      else {
        this.router.navigate(['login']);
      }
    }, (error => {
      this.toastrService.showToast('Greška', 'Pokušajte kasnije.', 'warning')
    }));
  }

}
