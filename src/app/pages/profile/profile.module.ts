import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  NbButtonModule,
  NbCardModule,
  NbInputModule,
  NbPopoverModule,
  NbProgressBarModule,
  NbTabsetModule,
} from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { PagesModule } from '../pages.module';
import { PopupWindowsModule } from '../popup-windows/popup-windows.module';
import { StorageModule } from '../storage-containers/storage.module';
import { ProfilePermitsComponent } from './profile-permits/profile-permits.component';
import { ProfileCompanyComponent } from './profile-company/profile-company.component';
import { ProfileUserComponent } from './profile-user/profile-user.component';
import { ProfileVehiclesComponent } from './profile-vehicles/profile-vehicles.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileStoragesComponent } from './profile-storages/profile-storages.component';
import { ProfileComponent } from './profile.component';

@NgModule({
  declarations: [
    ProfileComponent,
    ProfileCompanyComponent,
    ProfilePermitsComponent,
    ProfileUserComponent,
    ProfileVehiclesComponent,
    ProfileStoragesComponent,
  ],
  imports: [
    ProfileRoutingModule,
    CommonModule,
    FormsModule,
    NbInputModule,
    NbProgressBarModule,
    NbButtonModule,
    NbTabsetModule,
    NbCardModule,
    NbPopoverModule,
    Ng2SmartTableModule,
    PagesModule,
    PopupWindowsModule,
    StorageModule,
  ],
})
export class ProfileModule {
}
