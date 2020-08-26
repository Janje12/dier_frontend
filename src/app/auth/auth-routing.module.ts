import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  NbAuthComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent,
} from '@nebular/auth';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RegisterDozvolaComponent } from './register/register-dozvola/register-dozvola.component';
import { RegisterFirmaComponent } from './register/register-firma/register-firma.component';
import { RegisterInformacijeComponent } from './register/register-informacije/register-informacije.component';
import { RegisterKorisnikComponent } from './register/register-korisnik/register-korisnik.component';
import { RegisterOperacijeComponent } from './register/register-operacije/register-operacije.component';
import { RegisterPotvrdaComponent } from './register/register-potvrda/register-potvrda.component';

export const routes: Routes = [
  {
    path: '',
    component: NbAuthComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register-korisnik',
        component: RegisterKorisnikComponent,
      },
      {
        path: 'register-firma',
        component: RegisterFirmaComponent,
      },
      {
        path: 'register-operacije',
        component: RegisterOperacijeComponent,
      },
      {
        path: 'register-informacije',
        component: RegisterInformacijeComponent,
      },
      {
        path: 'register-dozvola',
        component: RegisterDozvolaComponent,
      },
      {
        path: 'register-potvrda',
        component: RegisterPotvrdaComponent,
      },
      {
        path: 'logout',
        component: LogoutComponent,
      },
      {
        path: 'request-password',
        component: NbRequestPasswordComponent,
      },
      {
        path: 'reset-password',
        component: NbResetPasswordComponent,
      },
    ],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NgxAuthRoutingModule {
}
