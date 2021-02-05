import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  NbButtonModule,
  NbCardModule,
  NbFormFieldModule,
  NbIconModule, NbInputModule,
  NbMenuModule, NbPopoverModule, NbProgressBarModule,
  NbTabsetModule, NbToastrService,
} from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { PermitService } from '../@core/service/permit.service';
import { CompanyService } from '../@core/service/company.service';
import { UserService } from '../@core/service/user.service';
import { VehicleService } from '../@core/service/vehicle.service';
import { RoleService } from '../@core/service/role.service';
import { ThemeModule } from '../@theme/theme.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { TrashModule } from './trash/trash.module';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { StorageModule } from './storage-containers/storage.module';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    NbButtonModule,
    DashboardModule,
    TrashModule,
    StorageModule,
    NbCardModule,
    NbTabsetModule,
    NbIconModule,
    FormsModule,
    NbFormFieldModule,
    NbInputModule,
    NbProgressBarModule,
    NbPopoverModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    PagesComponent,
  ],
  providers: [
    UserService,
    RoleService,
    NbToastrService,
    CompanyService,
    PermitService,
    VehicleService,
  ],
  exports: [],
})
export class PagesModule {
}
