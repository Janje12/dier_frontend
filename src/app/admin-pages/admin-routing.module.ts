import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { CompaniesComponent } from './companies/companies.component';
import { CompanyComponent } from './companies/company/company.component';
import { PermitComponent } from './permits/permit/permit.component';
import { PermitsComponent } from './permits/permits.component';
import { ProfileComponent } from './profile/profile.component';
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
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'users',
        component: UsersComponent,
      },
      {
        path: 'users/:username',
        component: UserComponent,
      },
      {
        path: 'companies',
        component: CompaniesComponent,
      },
      {
        path: 'companies/:pib',
        component: CompanyComponent,
      },
      {
        path: 'storages',
        component: StoragesComponent,
      },
      {
        path: 'storages/:id',
        component: StorageComponent,
      },
      {
        path: 'permits',
        component: PermitsComponent,
      },
      {
        path: 'permits/:id',
        component: PermitComponent,
      },
      {
        path: 'reports',
        loadChildren: () => import('./reports/reports.module')
          .then(m => m.ReportsModule),
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
