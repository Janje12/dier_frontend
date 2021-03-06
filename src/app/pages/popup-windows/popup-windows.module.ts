import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  NbAccordionModule,
  NbAutocompleteModule,
  NbButtonModule, NbCardModule, NbCheckboxModule, NbDatepickerModule, NbIconModule, NbInputModule, NbPopoverModule,
  NbSelectModule,
  NbToggleModule,
} from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { CatalogService } from '../../@core/service/catalog.service';
import { TransactionsService } from '../../@core/service/transactions.service';
import { AddTrashPopupComponent } from './add-trash-popup/add-trash-popup.component';
import { LeftoverTrashPopupComponent } from './leftover-trash-popup/leftover-trash-popup.component';
import { ProcessTrashPopupComponent } from './process-trash-popup/process-trash-popup.component';
import { ViewPermitsTrashPopupComponent } from './view-permits-trash-popup/view-permits-trash-popup.component';
import { AddSpecialWastePopupComponent } from './add-special-waste-popup/add-special-waste-popup.component';
import { AddVehiclePopupComponent } from './add-vehicle-popup/add-vehicle-popup.component';
import { AddPermitPopupComponent } from './add-permit-popup/add-permit-popup.component';
import { ContactFormPopupComponent } from './contact-form-popup/contact-form-popup.component';

@NgModule({
  declarations: [
    AddTrashPopupComponent,
    LeftoverTrashPopupComponent,
    ProcessTrashPopupComponent,
    ViewPermitsTrashPopupComponent,
    AddSpecialWastePopupComponent,
    AddVehiclePopupComponent,
    AddPermitPopupComponent,
    ContactFormPopupComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NbAutocompleteModule,
    NbButtonModule,
    NbToggleModule,
    NbAccordionModule,
    NbSelectModule,
    NbIconModule,
    NbPopoverModule,
    Ng2SmartTableModule,
    NbInputModule,
    NbCheckboxModule,
    NbCardModule,
    NbDatepickerModule,
  ],
  providers: [
    CatalogService,
    TransactionsService,
  ],
	exports: [
		ViewPermitsTrashPopupComponent,
		ProcessTrashPopupComponent,
		AddTrashPopupComponent,
		LeftoverTrashPopupComponent,
		AddSpecialWastePopupComponent,
		AddVehiclePopupComponent,
		AddPermitPopupComponent,
		ContactFormPopupComponent,
	],
})
export class PopupWindowsModule {
}
