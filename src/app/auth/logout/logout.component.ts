import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  getDeepFromObject,
  NB_AUTH_OPTIONS,
  NbAuthResult,
  NbAuthService,
  NbLogoutComponent,
  NbTokenService,
} from '@nebular/auth';

@Component({
  selector: 'ngx-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent extends NbLogoutComponent {

  redirectDelay: number = 0;
  strategy: string = '';

  constructor(protected service: NbAuthService,
              @Inject(NB_AUTH_OPTIONS) protected options = {},
              protected router: Router, private tokenService: NbTokenService) {
    super(service, options, router);
    this.redirectDelay = this.getConfigValue('forms.logout.redirectDelay');
    this.strategy = this.getConfigValue('forms.logout.strategy');
  }

  logout(strategy: string): void {
    this.service.logout(strategy).subscribe((result: NbAuthResult) => {
      const redirect = result.getRedirect();

      if (redirect) {
        setTimeout(() => {
          return this.router.navigateByUrl(redirect);
        }, this.redirectDelay);
      }
    });
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }
}
