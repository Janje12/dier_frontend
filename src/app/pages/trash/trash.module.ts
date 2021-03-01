import { NgModule } from '@angular/core';
import { PermitService } from '../../@core/service/permit.service';
import { SpecialWasteService } from '../../@core/service/specialWaste.service';
import { ThemeModule } from '../../@theme/theme.module';
import { TrashComponent } from './trash.component';
import { TrashRoutingModule } from './trash-routing.module';
import { AddTrashComponent } from './add-trash/add-trash.component';
import {
  NbButtonModule, NbCardModule, NbCheckboxModule, NbDatepickerModule, NbInputModule,
  NbSelectModule, NbToggleModule,
} from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { CatalogService } from '../../@core/service/catalog.service';
import { FormsModule } from '@angular/forms';
import { TrashService } from '../../@core/service/trash.service';
import { AddSpecialWasteComponent } from './add-special-waste/add-special-waste.component';

@NgModule({
  imports: [
    ThemeModule,
    TrashRoutingModule,
    NbCardModule,
    NbInputModule,
    NbSelectModule,
    NbCheckboxModule,
    Ng2SmartTableModule,
    NbButtonModule,
    FormsModule,
    NbDatepickerModule,
    NbToggleModule,
  ],
  declarations: [
    TrashComponent,
    AddTrashComponent,
    AddSpecialWasteComponent,
  ],
  providers: [
    CatalogService,
    TrashService,
    PermitService,
    SpecialWasteService,
  ],
})
export class TrashModule {
}
