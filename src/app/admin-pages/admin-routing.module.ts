import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { CompaniesComponent } from './companies/companies.component';
import { CompanyComponent } from './companies/company/company.component';
import { ProfileComponent } from './profile/profile.component';
import { CompanyReportsComponent } from './reports/company-reports/company-reports.component';
import { ReportsComponent } from './reports/reports.component';
import { TrashTransportReportComponent } from './reports/trash-transport-report/trash-transport-report.component';
import { StorageComponent } from './storages/storage/storage.component';
import { StoragesComponent } from './storages/storages.component';
import { UserComponent } from './users/user/user.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
     /* {
        path: 'admin-dashboard',
        loadChildren: () => import('./admin-dashboard/admin-dashboard.module')
          .then(m => m.AdminDashboardModule),
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'korisnici',
        component: UsersComponent,
      },
      {
        path: 'korisnici/:korisnickoIme',
        component: UserComponent,
      },
      {
        path: 'firme',
        component: CompaniesComponent,
      },
      {
        path: 'firme/:pib',
        component: CompanyComponent,
      },
      {
        path: 'skladiste',
        component: StoragesComponent,
      },
      {
        path: 'skladiste/:id',
        component: StorageComponent,
      },
      {
        path: 'izvestaji',
        loadChildren: () => import('./reports/reports.module')
          .then(m => m.ReportsModule),
      },*/
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {
}
