import { HTTP_INTERCEPTORS, HttpRequest } from '@angular/common/http';
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NB_AUTH_TOKEN_INTERCEPTOR_FILTER,
  NbAuthJWTInterceptor,
  NbAuthJWTToken,
  NbAuthModule,
  NbPasswordAuthStrategy,
} from '@nebular/auth';
import { NbSecurityModule, NbRoleProvider } from '@nebular/security';
import { environment } from '../../environments/environment.prod';
import { throwIfAlreadyLoaded } from './module-import-guard';
import {
  AnalyticsService,
  LayoutService,
  StateService,
} from './utils';

import { KorisnikService } from './service/korisnik.service';
import { KorisnikData } from './data/korisnik';
import { of } from 'rxjs';


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
  geolokacija: {
    required: false,
    minLength: 6,
    maxLength: 16,
    pattern: '[0-9]',
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

const DATA_SERVICES = [
  {provide: KorisnikData, useClass: KorisnikService},
];

export class NbSimpleRoleProvider extends NbRoleProvider {

  getRole() {
    // here you could provide any role based on any auth flow
    return of('guest');
  }
}

export const NB_CORE_PROVIDERS = [
  ...DATA_SERVICES,
  ...NbAuthModule.forRoot({
    strategies: [
      NbPasswordAuthStrategy.setup({
        name: 'email',
        token: {
          class: NbAuthJWTToken,
          key: 'token',
        },
        baseEndpoint: (environment.production ? environment.apiUrl : '') + '/api/auth',
        login: {
          endpoint: '/login',
          method: 'post',
          redirect: {
            success: '/pages',
            failure: null,
          },
        },
        refreshToken: {
          endpoint: '/refresh',
          method: 'post',
        },
        register: {
          endpoint: '/register',
          method: 'post',
          redirect: {
            success: '../login',
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
        redirectDelay: 300,
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
  }).providers,

  NbSecurityModule.forRoot({
    accessControl: {
      guest: {
        view: '*',
      },
      user: {
        parent: 'guest',
        create: '*',
        edit: '*',
        remove: '*',
      },
    },
  }).providers,
  {
    provide: NbRoleProvider, useClass: NbSimpleRoleProvider,
  },
  AnalyticsService,
  LayoutService,
  StateService,
];

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    NbAuthModule,
  ],
  declarations: [],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        ...NB_CORE_PROVIDERS, [{provide: HTTP_INTERCEPTORS, useClass: NbAuthJWTInterceptor, multi: true},
          {
            provide: NB_AUTH_TOKEN_INTERCEPTOR_FILTER, useValue: function (req: HttpRequest<any>) {
              if (req.url === '/api/auth/login') {
                return true;
              }
              if (req.url === '/api/auth/refresh') {
                return true;
              }
              return false;
            },
          },
        ],
      ],
    };
  }
}
