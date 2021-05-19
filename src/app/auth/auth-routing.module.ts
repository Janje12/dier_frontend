import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  NbAuthComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent,
} from '@nebular/auth';
import { EmailConfirmationComponent } from './email-confirmation/email-confirmation.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RedirectComponent } from './redirect/redirect.component';
import { RegisterGuard } from './register-guard.service';
import { RegisterPermitComponent } from './register/register-permit/register-permit.component';
import { RegisterCompanyComponent } from './register/register-company/register-company.component';
import { RegisterInformationsComponent } from './register/register-informations/register-informations.component';
import { RegisterUserComponent } from './register/register-user/register-user.component';
import { RegisterOperationsComponent } from './register/register-operations/register-operations.component';
import { RegisterConfirmationComponent } from './register/register-confirmation/register-confirmation.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

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
        canActivate: [RegisterGuard],
      },
      {
        path: 'register-company',
        component: RegisterCompanyComponent,
        canActivate: [RegisterGuard],
      },
      {
        path: 'register-operations',
        component: RegisterOperationsComponent,
        canActivate: [RegisterGuard],
      },
      {
        path: 'register-informations/:tab',
        component: RegisterInformationsComponent,
        pathMatch: 'full',
        canActivate: [RegisterGuard],
      },
      {
        path: 'register-informations',
        component: RegisterInformationsComponent,
        pathMatch: 'full',
        canActivate: [RegisterGuard],
      },
      {
        path: 'register-permit',
        component: RegisterPermitComponent,
      },
      {
        path: 'register-confirmation',
        component: RegisterConfirmationComponent,
        canActivate: [RegisterGuard],
      },
      {
        path: 'logout',
        component: LogoutComponent,
      },
      {
        path: 'email-confirm',
        component: EmailConfirmationComponent,
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
      },
      {
        path: 'reset-password',
        component: ResetPasswordComponent,
      },
    ],
  },
  {path: 'redirect', component: RedirectComponent},
  {path: '', redirectTo: 'auth/login'},
  {path: '**', redirectTo: 'auth/login'},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NgxAuthRoutingModule {
}
