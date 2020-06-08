import {NgModule} from '@angular/core';

import {ThemeModule} from '../../@theme/theme.module';
import {NbButtonModule, NbCardModule, NbCheckboxModule, NbInputModule, NbSelectModule} from '@nebular/theme';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {KatalogService} from '../../@core/service/katalog.service';
import {FormsModule} from '@angular/forms';
import {DodajOtpadComponent} from './dodaj-otpad/dodaj-otpad.component';
import {PtopadComponent} from './ptopad.component';
import {PtotpadRoutingModule} from './ptopad-routing.module';
import {PTOtpadService} from '../../@core/service/ptotpad.service';

@NgModule({
  imports: [
    ThemeModule,
    NbCardModule,
    NbInputModule,
    NbSelectModule,
    NbCheckboxModule,
    Ng2SmartTableModule,
    NbButtonModule,
    FormsModule,
    PtotpadRoutingModule,
  ],
  declarations: [
    DodajOtpadComponent,
    PtopadComponent,
  ],
  providers: [KatalogService, PTOtpadService],
})
export class PtotpadModule {
}
