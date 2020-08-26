import { AfterViewInit, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getDeepFromObject, NB_AUTH_OPTIONS, NbAuthResult, NbAuthService, NbRegisterComponent } from '@nebular/auth';
import { Observable } from 'rxjs';
import { Firma } from '../../@core/data/firma';
import { Korisnik } from '../../@core/data/korisnik';
import { RegisterService } from '../../@core/service/register.service';

@Component({
  selector: 'ngx-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent extends NbRegisterComponent implements AfterViewInit {

  firma$: Observable<Firma>;
  korisnik$: Observable<Korisnik>;
  informacije$: Observable<any>;
  operacije$: Observable<string[]>;
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

  ngAfterViewInit(): void {
    this.informacije$ = this.registerService.getInformacije();
    this.operacije$ = this.registerService.getOperacije();
    this.firma$ = this.registerService.getFirma();
    this.korisnik$ = this.registerService.getKorisnik();
  }

  register(): void {
    this.errors = this.messages = [];
    this.submitted = true;

    let korisnik: Korisnik;
    this.korisnik$.subscribe(k => {
      korisnik = k;
    });

    this.service.register(this.strategy, korisnik).subscribe((result: NbAuthResult) => {
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
