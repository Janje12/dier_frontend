import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NB_AUTH_OPTIONS, NbAuthService, NbResetPasswordComponent } from '@nebular/auth';
import { ToastrService } from '../../@core/service/toastr.service';

@Component({
  selector: 'reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent extends NbResetPasswordComponent {

  showPassword: string = 'eye';
  password: string = '';
  retypePassword: string = '';
  token: string = '';

  constructor(protected service: NbAuthService, @Inject(NB_AUTH_OPTIONS) protected options = {},
              protected cd: ChangeDetectorRef, protected router: Router, private activatedRoute: ActivatedRoute,
              private toastrService: ToastrService) {
    super(service, options, cd, router);
    this.strategy = this.getConfigValue('forms.login.strategy');
    this.token = this.activatedRoute.snapshot.params['token'];
  }

  resetPassword(form: NgForm) {
    if (form.invalid) {
      this.toastrService.showToast('Greška', 'Proverite sve informacije!', 'warning');
      return;
    }
    this.service.resetPassword(this.strategy, {password: this.password, token: this.token}).subscribe(result => {
      if (!result.isSuccess()) {
        this.toastrService.showToast('Greška', 'Pokušajte ponovo kasnije', 'warning');
        return;
      } else {
        this.router.navigate(['login']);
      }
    }, error => {
      this.toastrService.showToast('Greška', 'Pokušajte ponovo kasnije', 'warning');
    });
  }
}
