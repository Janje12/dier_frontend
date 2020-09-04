import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { CompaniesComponent } from './companies/companies.component';
import { CompanyComponent } from './companies/company/company.component';
import { ReportsComponent } from './reports/reports.component';
import { StorageComponent } from './storages/storage/storage.component';
import { StoragesComponent } from './storages/storages.component';
import { UserComponent } from './users/user/user.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'admin-dashboard',
        loadChildren: () => import('./admin-dashboard/admin-dashboard.module')
          .then(m => m.AdminDashboardModule),
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
        path: 'skladistа',
        component: StoragesComponent,
      },
      {
        path: 'skladistа/:id',
        component: StorageComponent,
      },
      {
        path: 'izvestaji',
        component: ReportsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {
}
