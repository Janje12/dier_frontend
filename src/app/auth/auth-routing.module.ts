import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  NbAuthComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent,
} from '@nebular/auth';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RegisterPermitComponent } from './register/register-permit/register-permit.component';
import { RegisterCompanyComponent } from './register/register-company/register-company.component';
import { RegisterInformationsComponent } from './register/register-informations/register-informations.component';
import { RegisterUserComponent } from './register/register-user/register-user.component';
import { RegisterOperationsComponent } from './register/register-operations/register-operations.component';
import { RegisterConfirmationComponent } from './register/register-confirmation/register-confirmation.component';

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
        path: 'register-user',
        component: RegisterUserComponent,
      },
      {
        path: 'register-company',
        component: RegisterCompanyComponent,
      },
      {
        path: 'register-operations',
        component: RegisterOperationsComponent,
      },
      {
        path: 'register-informations/:tab',
        component: RegisterInformationsComponent,
        pathMatch: 'full',
      },
      {
        path: 'register-informations',
        component: RegisterInformationsComponent,
        pathMatch: 'full',
      },
      {
        path: 'register-permit',
        component: RegisterPermitComponent,
      },
      {
        path: 'register-confirmation',
        component: RegisterConfirmationComponent,
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
  {path: '', redirectTo: 'auth/login'},
  {path: '**', redirectTo: 'auth/login'},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NgxAuthRoutingModule {
}
