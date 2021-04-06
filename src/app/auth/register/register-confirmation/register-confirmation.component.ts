import { AfterViewInit, ChangeDetectorRef, Component, Inject, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { getDeepFromObject, NB_AUTH_OPTIONS, NbAuthResult, NbAuthService, NbRegisterComponent } from '@nebular/auth';
import { NbWindowRef, NbWindowService } from '@nebular/theme';
import { RecaptchaComponent } from 'ng-recaptcha';
import { Observable } from 'rxjs';
import { Company } from '../../../@core/data/company';
import { User } from '../../../@core/data/user';
import { RegisterService } from '../../../@core/service/register.service';

@Component({
  selector: 'register-confirmation',
  templateUrl: './register-confirmation.component.html',
  styleUrls: ['./register-confirmation.component.scss'],
})
export class RegisterConfirmationComponent extends NbRegisterComponent implements AfterViewInit {
  @ViewChild('reCaptcha') reCaptcha: RecaptchaComponent;
  @ViewChild('termsOfServiceTemplate', {read: TemplateRef}) termsOfServiceTemplate: TemplateRef<HTMLElement>;
  private windowRef: NbWindowRef;

  company$: Observable<Company>;
  user$: Observable<User>;
  operations$: Observable<string[]>;
  redirectDelay: number = 0;
  showMessages: any = [];
  strategy: string = '';
  submitted = false;
  errors: string[] = [];
  messages: string[] = [];
  reCaptchaModel: any;

  constructor(protected service: NbAuthService, @Inject(NB_AUTH_OPTIONS) protected options = {},
              private windowService: NbWindowService,
              protected cd: ChangeDetectorRef, protected router: Router, private registerService: RegisterService) {
    super(service, options, cd, router);
    this.redirectDelay = this.getConfigValue('forms.register.redirectDelay');
    this.showMessages = this.getConfigValue('forms.register.showMessages');
    this.strategy = this.getConfigValue('forms.register.strategy');
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }

  ngAfterViewInit(): void {
    this.operations$ = this.registerService.getOperations();
    this.company$ = this.registerService.getCompany();
    this.user$ = this.registerService.getUser();
  }

  resolved(token: any) {
  }

  register(): void {
    this.errors = this.messages = [];
    this.submitted = true;
    this.reCaptcha.execute();
    let user: User;
    this.user$.subscribe(k => {
      user = k;
    });

    this.service.register(this.strategy, user).subscribe((result: NbAuthResult) => {
      this.submitted = false;
      if (result.isSuccess()) {
        this.messages = result.getMessages();
      } else {
        this.errors = result.getErrors();
      }
      const redirect = result.getRedirect();
      if (redirect) {
        setTimeout(() => {
          this.registerService.clearData();
          return this.router.navigateByUrl(redirect);
        }, this.redirectDelay);
      }
      this.cd.detectChanges();
    });
  }

  openTermsOfService() {
    this.windowRef = this.windowService.open(this.termsOfServiceTemplate, {title: 'Uslovi korišćenja'});
  }
}
