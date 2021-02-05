import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  NbAccordionModule,
  NbButtonModule,
  NbCardModule, NbDatepickerModule,
  NbIconModule,
  NbInputModule,
  NbMenuModule,
  NbProgressBarModule, NbRadioModule, NbSelectModule, NbStepperModule, NbTabsetModule,
} from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { DkoService } from '../@core/service/dko.service';
import { CompanyService } from '../@core/service/company.service';
import { UserService } from '../@core/service/user.service';
import { MesecniIzvestajService } from '../@core/service/mesecniIzvestaj.service';
import { TrashService } from '../@core/service/trash.service';
import { RoleService } from '../@core/service/role.service';
import { StorageService } from '../@core/service/storage.service';
import { ThemeModule } from '../@theme/theme.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { CompaniesComponent } from './companies/companies.component';
import { ProfileKorisnikComponent } from './profile/profile-korisnik/profile-korisnik.component';
import { ReportsComponent } from './reports/reports.component';
import { ReportsModule } from './reports/reports.module';
import { UsersComponent } from './users/users.component';
import { StoragesComponent } from './storages/storages.component';
import { UserComponent } from './users/user/user.component';
import { CompanyComponent } from './companies/company/company.component';
import { StorageComponent } from './storages/storage/storage.component';
import { ProfileComponent } from './profile/profile.component';
import { CompanyReportsComponent } from './reports/company-reports/company-reports.component';
import { StorageReportsComponent } from './reports/storage-reports/storage-reports.component';
import { TrashTransportReportComponent } from './reports/trash-transport-report/trash-transport-report.component';
import { TrashPartComponent } from './reports/trash-transport-report/trash-part/trash-part.component';
import { CompanyPartComponent } from './reports/trash-transport-report/company-part/company-part.component';

@NgModule({
	imports: [
		CommonModule,
		AdminRoutingModule,
		ThemeModule,
		NbMenuModule,
		NbCardModule,
		Ng2SmartTableModule,
		NbInputModule,
		FormsModule,
		NbButtonModule,
		NbIconModule,
		NbProgressBarModule,
		NbAccordionModule,
		NbTabsetModule,
		NbStepperModule,
		NbSelectModule,
		NbDatepickerModule,
		NbRadioModule,
		ReportsModule,
	],
  declarations: [
    AdminComponent,
    UsersComponent,
    ReportsComponent,
    CompaniesComponent,
    StoragesComponent,
    UserComponent,
    CompanyComponent,
    StorageComponent,
    ProfileComponent,
    ProfileKorisnikComponent,
    CompanyReportsComponent,
    StorageReportsComponent,
    TrashTransportReportComponent,
    TrashPartComponent,
    CompanyPartComponent,
  ],
  providers: [
    UserService,
    CompanyService,
    TrashService,
    MesecniIzvestajService,
    StorageService,
    RoleService,
    DkoService,
  ],
})
export class AdminModule {
}
