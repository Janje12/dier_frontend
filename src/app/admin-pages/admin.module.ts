import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbInputModule,
  NbMenuModule,
  NbProgressBarModule,
} from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FirmaService } from '../@core/service/firma.service';
import { KorisnikService } from '../@core/service/korisnik.service';
import { SkladisteService } from '../@core/service/skladiste.service';
import { ThemeModule } from '../@theme/theme.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { CompaniesComponent } from './companies/companies.component';
import { ReportsComponent } from './reports/reports.component';
import { UsersComponent } from './users/users.component';
import { StoragesComponent } from './storages/storages.component';
import { UserComponent } from './users/user/user.component';
import { CompanyComponent } from './companies/company/company.component';
import { StorageComponent } from './storages/storage/storage.component';

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
  ],
  providers: [
    KorisnikService,
    FirmaService,
    SkladisteService,
  ],
})
export class AdminModule {
}
