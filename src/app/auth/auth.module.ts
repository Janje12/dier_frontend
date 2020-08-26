import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { DelatnostService } from '../@core/service/delatnost.service';
import { KatalogService } from '../@core/service/katalog.service';
import { MestoService } from '../@core/service/mesto.service';
import { RegisterService } from '../@core/service/register.service';
import { ThemeModule } from '../@theme/theme.module';
import { NgxAuthRoutingModule } from './auth-routing.module';
import {
  NbAuthJWTToken, NbAuthModule, NbPasswordAuthStrategy,
} from '@nebular/auth';
import {
  NbAccordionModule, NbAlertModule, NbAutocompleteModule, NbButtonModule, NbCardModule, NbCheckboxModule,
  NbInputModule, NbPopoverModule, NbSelectModule, NbStepperModule, NbTabsetModule, NbToggleModule,
} from '@nebular/theme';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RegisterFirmaComponent } from './register/register-firma/register-firma.component';
import { RegisterInformacijeComponent } from './register/register-informacije/register-informacije.component';
import { RegisterKorisnikComponent } from './register/register-korisnik/register-korisnik.component';
import { RegisterOperacijeComponent } from './register/register-operacije/register-operacije.component';
import { RegisterPotvrdaComponent } from './register/register-potvrda/register-potvrda.component';
import { RegisterComponent } from './register/register.component';
import { VALLIDATION_SETTINGS } from './auth_settings';
import { ProizvodnjaComponent } from './register/register-informacije/otpad/proizvodnja/proizvodnja.component';
import { TransportComponent } from './register/register-informacije/otpad/transport/transport.component';
import { TretmanComponent } from './register/register-informacije/otpad/tretman/tretman.component';
import { RegisterDozvolaComponent } from './register/register-dozvola/register-dozvola.component';

const settings: any = [
  {
    redirectDelay: 0,
    showMessages: {
      success: true,
      error: true,
    },
  },
];

@NgModule({
  imports: [
    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: 'email',
          token: {
            class: NbAuthJWTToken,
            key: 'token',
          },
          baseEndpoint: '/api/auth',
          login: {
            endpoint: '/login',
            method: 'post',
            redirect: {
              success: '/pages/dashboard',
              failure: null,
            },
          },
          register: {
            endpoint: '/register',
            method: 'post',
            redirect: {
              success: './login',
              failure: null,
            },
          },
          logout: {
            endpoint: '/logout',
            method: 'delete',
            redirect: {
              success: '/auth/login',
            },
          },
        }),
      ],
      forms: {
        login: {
          settings,
          rememberMe: true,
        },
        register: {settings},
        requestPassword: {settings},
        resetPassword: {settings},
        logout: {
          redirectDelay: 500,
        },
        validation: VALLIDATION_SETTINGS,
      },
    }),
    ThemeModule,
    CommonModule,
    RouterModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    NgxAuthRoutingModule,
    NbSelectModule,
    FormsModule,
    NbToggleModule,
    NbAccordionModule,
    NbTabsetModule,
    NbAutocompleteModule,
    NbStepperModule,
    NbCardModule,
    Ng2SmartTableModule,
    NbPopoverModule,
  ],
  declarations: [
    LoginComponent,
    LogoutComponent,
    RegisterComponent,
    RegisterKorisnikComponent,
    RegisterFirmaComponent,
    RegisterOperacijeComponent,
    RegisterInformacijeComponent,
    RegisterDozvolaComponent,
    RegisterPotvrdaComponent,
    ProizvodnjaComponent,
    TransportComponent,
    TretmanComponent,
  ],
  providers: [
    MestoService,
    DelatnostService,
    RegisterService,
    KatalogService,
  ],
})

export class NgxAuthModule {
}
