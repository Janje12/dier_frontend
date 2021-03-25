import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PermitRenewalComponent } from './permit-renewal/permit-renewal.component';
import { ProfilePermitsComponent } from './profile-permits/profile-permits.component';
import { ProfileVehiclesComponent } from './profile-vehicles/profile-vehicles.component';
import { ProfileComponent } from './profile.component';

const routes: Routes = [
  {
    path: 'vehicles',
    component: ProfileVehiclesComponent,
    pathMatch: 'full',
  },
  {
    path: 'permits',
    component: ProfilePermitsComponent,
    pathMatch: 'full',
  },
  {
    path: 'permit-renewal',
    component: PermitRenewalComponent,
  },
  {
    path: ':activeTab',
    component: ProfileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {
}
