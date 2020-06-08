import {NgModule} from '@angular/core';

import {ThemeModule} from '../../@theme/theme.module';
import {OotpadComponent} from './ootpad.component';
import {OotpadRoutingModule} from './ootpad-routing.module';
import {NbButtonModule, NbCardModule, NbCheckboxModule, NbInputModule, NbSelectModule} from '@nebular/theme';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {KatalogService} from '../../@core/service/katalog.service';
import {FormsModule} from '@angular/forms';
import {OOtpadService} from '../../@core/service/ootpad.service';
import {DodajOtpadComponent} from './dodaj-otpad/dodaj-otpad.component';

@NgModule({
  imports: [
    ThemeModule,
    OotpadRoutingModule,
    NbCardModule,
    NbInputModule,
    NbSelectModule,
    NbCheckboxModule,
    Ng2SmartTableModule,
    NbButtonModule,
    FormsModule,
  ],
  declarations: [
    OotpadComponent,
    DodajOtpadComponent,
  ],
  providers: [KatalogService, OOtpadService],
})
export class OotpadModule {
}
