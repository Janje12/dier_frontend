import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from './auth-guard.service';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module')
      .then(m => m.NgxAuthModule),
  },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    loadChildren: () => import('./admin-pages/admin.module')
      .then(m => m.AdminModule),
  },
  {
    path: 'pages',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/pages.module')
      .then(m => m.PagesModule),
  },
  {path: '', redirectTo: 'pages', pathMatch: 'full'},
  {path: '**', redirectTo: 'pages'},
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
