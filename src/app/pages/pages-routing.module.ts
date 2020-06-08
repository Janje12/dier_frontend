import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';

import { PagesComponent } from './pages.component';
import { ProfileComponent } from './profile/profile.component';
import { SkladisteComponent } from './skladiste/skladiste.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'auth',
      loadChildren: () => import('../auth/auth.module')
        .then(m => m.NgxAuthModule),
    },
    {
      path: 'profile',
      component: ProfileComponent,
    },
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: 'skladiste',
      component: SkladisteComponent,
    },
    {
      path: 'notpad',
      loadChildren: () => import('./notpad/notpad.module')
        .then(m => m.NotpadModule),
    },
    {
      path: 'ootpad',
      loadChildren: () => import('./ootpad/ootpad.module')
        .then(m => m.OotpadModule),
    },
    {
      path: 'ptotpad',
      loadChildren: () => import('./ptotpad/ptopad.module')
        .then(m => m.PtotpadModule),
    },
    {
      path: 'aotpad',
      loadChildren: () => import('./aotpad/aotpad.module')
        .then(m => m.AotpadModule),
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
