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
import { environment } from '../../environments/environment';
import { throwIfAlreadyLoaded } from './module-import-guard';
import {
  AnalyticsService,
  LayoutService,
  StateService,
} from './utils';
import { FORM_SETTINGS, VALLIDATION_SETTINGS } from './auth_settings';
import { UserService } from './service/user.service';
import { UserData } from './data/user';
import { of } from 'rxjs';

const DATA_SERVICES = [
  {provide: UserData, useClass: UserService},
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
        baseEndpoint: environment.apiUrl + '/api/auth',
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
            success: '/auth/login',
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
        FORM_SETTINGS,
        redirectDelay: 300,
        rememberMe: true,
      },
      register: {FORM_SETTINGS},
      requestPassword: {FORM_SETTINGS},
      resetPassword: {FORM_SETTINGS},
      logout: {
        redirectDelay: 500,
      },
      validation: VALLIDATION_SETTINGS,
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
              if (req.url === environment.apiUrl + '/api/auth/login') {
                return true;
              }
              if (req.url ===  environment.apiUrl + '/api/auth/refresh') {
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
