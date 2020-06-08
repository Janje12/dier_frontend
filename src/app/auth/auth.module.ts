import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RegisterService } from '../@core/service/register.service';
import { ThemeModule } from '../@theme/theme.module';
import { MestoService } from '../@core/service/mesto.service';
import { DelatnostService } from '../@core/service/delatnost.service';

import { NgxAuthRoutingModule } from './auth-routing.module';
import {
  NbAuthJWTToken,
  NbAuthModule,
  NbPasswordAuthStrategy,
} from '@nebular/auth';
import {
  NbAccordionModule,
  NbAlertModule, NbAutocompleteModule,
  NbButtonModule,
  NbCheckboxModule, NbDatepickerModule,
  NbInputModule, NbSelectModule, NbStepperModule, NbTabsetModule, NbToggleModule,
} from '@nebular/theme';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RegisterKorisnikComponent } from './register/register-korisnik/register-korisnik.component';
import { RegisterFirmaComponent } from './register/register-firma/register-firma.component';
import { RegisterOperacijeComponent } from './register/register-operacije/register-operacije.component';
import { RegisterInformacijeComponent } from './register/register-informacije/register-informacije.component';
import { RegisterPotvrdaComponent } from './register/register-potvrda/register-potvrda.component';
import { LogoutComponent } from './logout/logout.component';

const validationSettings: any = {
  // Registracija Korisnika
  korisnickoIme: {
    required: true,
    minLength: 6,
    maxLength: 20,
  },
  email: {
    required: true,
  },
  password: {
    required: true,
    minLength: 6,
    maxLength: 50,
  },
  ime: {
    required: true,
    minLength: 3,
    maxLength: 20,
    pattern: '^[a-zA-Z \-\']+',
  },
  prezime: {
    required: true,
    minLength: 3,
    maxLength: 30,
    pattern: '^[a-zA-Z \-\']+',
  },
  telefon: {
    required: true,
    minLength: 9,
    maxLength: 10,
  },
  // Registracija firma
  nazivFirme: {
    required: true,
    minLength: 1,
    maxLength: 30,
  },
  pib: {
    required: true,
    minLength: 9,
    maxLength: 9,
    pattern: '[0-9]{9}',
  },
  mat: {
    required: true,
    minLength: 8,
    maxLength: 8,
    pattern: '[0-9]{8}',
  },
  opstina: {
    required: true,
  },
  mesto: {
    required: true,
  },
  postanskiBroj: {
    required: true,
    minLength: 5,
    maxLength: 5,
  },
  ulica: {
    required: true,
  },
  delatnost: {
    required: true,
  },
  imeZakonskogZastupinka: {
    required: true,
    minLength: 5,
    maxLength: 50,
    pattern: '^[a-zA-Z \-\']+',
  },
  // Registracija skladista
  velicinaSkladista: {
    required: true,
    pattern: '[0-9]*',
  },
};

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
        validation: validationSettings,
      },
    }),
    ThemeModule,
    CommonModule,
    FormsModule,
    RouterModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    NgxAuthRoutingModule,
    NbStepperModule,
    NbSelectModule,
    NbToggleModule,
    NbTabsetModule,
    NbAccordionModule,
    NbDatepickerModule,
    ReactiveFormsModule,
    NbAutocompleteModule,
    ScrollingModule,
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    RegisterKorisnikComponent,
    RegisterFirmaComponent,
    RegisterOperacijeComponent,
    RegisterInformacijeComponent,
    RegisterPotvrdaComponent,
    LogoutComponent,
  ],
  providers: [
    MestoService,
    DelatnostService,
    RegisterService,
  ],
})

export class NgxAuthModule {


}
