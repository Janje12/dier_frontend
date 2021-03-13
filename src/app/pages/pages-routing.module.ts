import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { PagesComponent } from './pages.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module')
          .then(m => m.ProfileModule),
      },
      {
        path: 'storage',
        loadChildren: () => import('./storage-containers/storage.module')
          .then(m => m.StorageModule),
      },
      {
        path: 'trash',
        loadChildren: () => import('./trash/trash.module')
          .then(m => m.TrashModule),
      },
      {
        path: '',
        redirectTo: '/auth/redirect',
        pathMatch: 'full',
      },
      {
        path: '**',
        component: NotFoundComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
