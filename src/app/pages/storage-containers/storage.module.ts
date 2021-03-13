import { NgModule } from '@angular/core';
import { CatalogService } from '../../@core/service/catalog.service';
import { RoleService } from '../../@core/service/role.service';
import { TransactionsService } from '../../@core/service/transactions.service';
import { ThemeModule } from '../../@theme/theme.module';
import { PopupWindowsModule } from '../popup-windows/popup-windows.module';
import { StorageContainersComponent } from './storage-containers.component';
import { StorageService } from '../../@core/service/storage.service';
import {
  NbAccordionModule,
  NbAutocompleteModule, NbButtonModule,
  NbCardModule, NbCheckboxModule, NbIconModule,
  NbInputModule, NbLayoutModule,
  NbListModule,
  NbPopoverModule, NbProgressBarModule,
  NbSelectModule, NbToggleModule,
} from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FormsModule } from '@angular/forms';
import { StorageProductionComponent } from './storage-production/storage-production.component';
import { StorageRoutingModule } from './storage-routing.module';
import { StorageTreatmentComponent } from './storage-treatment/storage-treatment.component';
import { StorageDisposalComponent } from './storage-disposal/storage-disposal.component';
import { StorageCacheComponent } from './storage-cache/storage-cache.component';
import { StorageMeterComponent } from './storage-meter/storage-meter.component';

@NgModule({
  imports: [
    ThemeModule,
    StorageRoutingModule,
    NbCardModule,
    Ng2SmartTableModule,
    FormsModule,
    NbInputModule,
    NbPopoverModule,
    NbListModule,
    NbSelectModule,
    NbAutocompleteModule,
    NbButtonModule,
    NbProgressBarModule,
    NbCheckboxModule,
    NbIconModule,
    NbLayoutModule,
    NbToggleModule,
    NbAccordionModule,
    PopupWindowsModule,
  ],
  declarations: [
    StorageContainersComponent,
    StorageProductionComponent,
    StorageTreatmentComponent,
    StorageDisposalComponent,
    StorageCacheComponent,
    StorageMeterComponent,
  ],
  providers: [
    StorageService,
    CatalogService,
    TransactionsService,
  ],
  exports: [
    StorageMeterComponent,
  ],
})
export class StorageModule {
}
