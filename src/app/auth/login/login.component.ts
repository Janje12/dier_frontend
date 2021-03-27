import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { getDeepFromObject, NB_AUTH_OPTIONS, NbAuthResult, NbAuthService, NbLoginComponent } from '@nebular/auth';
import { RoleService } from '../../@core/service/role.service';

@Component({
  selector: 'auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent extends NbLoginComponent {

  showPassword: string = 'eye';
  redirectDelay: number = 0;
  showMessages: any = {};
  strategy: string = '';
  errors: string[] = [];
  messages: string[] = [];
  user: any = {email: '', password: '', rememberMe: false};
  submitted: boolean = false;
  rememberMe = false;

  constructor(protected service: NbAuthService, @Inject(NB_AUTH_OPTIONS) protected options = {},
              protected cd: ChangeDetectorRef, private roleService: RoleService, protected router: Router) {
    super(service, options, cd, router);
    this.redirectDelay = this.getConfigValue('forms.login.redirectDelay');
    this.showMessages = this.getConfigValue('forms.login.showMessages');
    this.strategy = this.getConfigValue('forms.login.strategy');
    this.rememberMe = this.getConfigValue('forms.login.rememberMe');
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }

  login(): void {
    this.errors = [];
    this.messages = [];
    this.submitted = true;

    this.service.authenticate(this.strategy, this.user).subscribe((result: NbAuthResult) => {
      this.submitted = false;

      if (result.isSuccess()) {
        this.messages = result.getMessages();
      } else {
        this.errors = result.getErrors();
      }

      const redirect = result.getRedirect();
      if (redirect) {
        this.roleService.loginUser();
        setTimeout(() => {
          return this.router.navigateByUrl(redirect);
        }, this.redirectDelay);
      }
      this.cd.detectChanges();
    });
  }

}
