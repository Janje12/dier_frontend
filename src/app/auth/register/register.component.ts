import { AfterViewInit, ChangeDetectorRef, Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { getDeepFromObject, NB_AUTH_OPTIONS, NbAuthResult, NbAuthService, NbRegisterComponent } from '@nebular/auth';
import { Firma } from '../../@core/data/firma';
import { Korisnik } from '../../@core/data/korisnik';
import { RegisterService } from '../../@core/service/register.service';

@Component({
  selector: 'ngx-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent extends NbRegisterComponent implements AfterViewInit {

  firma: Firma;
  korisnik: Korisnik;
  informacije: any;
  operacije: string[];
  redirectDelay: number = 0;
  showMessages: any = [];
  strategy: string = '';
  submitted = false;
  errors: string[] = [];
  messages: string[] = [];

  constructor(protected service: NbAuthService,
              @Inject(NB_AUTH_OPTIONS) protected options = {},
              protected cd: ChangeDetectorRef,
              protected router: Router, private registerService: RegisterService) {
    super(service, options, cd, router);
    this.redirectDelay = this.getConfigValue('forms.register.redirectDelay');
    this.showMessages = this.getConfigValue('forms.register.showMessages');
    this.strategy = this.getConfigValue('forms.register.strategy');
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }

  ngAfterViewInit() {
    this.registerService.sendInformacije().subscribe(i => {
      this.informacije = i;
    });
    this.registerService.sendOperacije().subscribe(o => {
      this.operacije = o;
    });
    this.registerService.sendFirma().subscribe(f => {
      this.firma = f;
    });
    this.registerService.sendKorisnik().subscribe(k => {
      this.korisnik = k;
    });
  }

  register(): void {
    this.errors = this.messages = [];
    this.submitted = true;

    this.service.register(this.strategy, this.korisnik).subscribe((result: NbAuthResult) => {
      this.submitted = false;
      if (result.isSuccess()) {
        this.messages = result.getMessages();
      } else {
        this.errors = result.getErrors();
      }
      const redirect = result.getRedirect();
      if (redirect) {
        setTimeout(() => {
          return this.router.navigateByUrl(redirect);
        }, this.redirectDelay);
      }
      this.cd.detectChanges();
    });
  }

}
