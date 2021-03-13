import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RecaptchaModule } from 'ng-recaptcha';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { CompanyService } from '../@core/service/company.service';
import { OccupationService } from '../@core/service/occupation.service';
import { CatalogService } from '../@core/service/catalog.service';
import { LocationService } from '../@core/service/location.service';
import { PermitService } from '../@core/service/permit.service';
import { RegisterService } from '../@core/service/register.service';
import { RoleService } from '../@core/service/role.service';
import { VehicleService } from '../@core/service/vehicle.service';
import { ThemeModule } from '../@theme/theme.module';
import { NgxAuthRoutingModule } from './auth-routing.module';
import {
  NbAccordionModule,
  NbAlertModule,
  NbAutocompleteModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDatepickerModule, NbIconModule,
  NbInputModule,
  NbPopoverModule,
  NbSelectModule, NbSpinnerModule,
  NbStepperModule,
  NbTabsetModule,
  NbToggleModule,
} from '@nebular/theme';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RegisterCompanyComponent } from './register/register-company/register-company.component';
import { RegisterInformationsComponent } from './register/register-informations/register-informations.component';
import { RegisterUserComponent } from './register/register-user/register-user.component';
import { RegisterOperationsComponent } from './register/register-operations/register-operations.component';
import { RegisterConfirmationComponent } from './register/register-confirmation/register-confirmation.component';
import { RegisterComponent } from './register/register.component';
import { TrashTransportComponent } from './register/register-informations/trash/trash-transport/trash-transport.component';
import { RegisterPermitComponent } from './register/register-permit/register-permit.component';
import { TrashStorageComponent } from './register/register-informations/trash/trash-storage/trash-storage.component';
import { TrashPermitComponent } from './register/register-informations/trash/trash-permit/trash-permit.component';
import { RedirectComponent } from './redirect/redirect.component';
import { EmailConfirmationComponent } from './email-confirmation/email-confirmation.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

@NgModule({
  imports: [
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
    NbDatepickerModule,
    NbIconModule,
    NbSpinnerModule,
    RecaptchaModule,
  ],
  declarations: [
    LoginComponent,
    LogoutComponent,
    RegisterComponent,
    RegisterUserComponent,
    RegisterCompanyComponent,
    RegisterOperationsComponent,
    RegisterInformationsComponent,
    RegisterPermitComponent,
    RegisterConfirmationComponent,
    TrashTransportComponent,
    TrashStorageComponent,
    TrashPermitComponent,
    RedirectComponent,
    EmailConfirmationComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
  ],
  providers: [
    LocationService,
    OccupationService,
    RegisterService,
    CompanyService,
    PermitService,
    VehicleService,
    CatalogService,
  ],
})

export class NgxAuthModule {
}
