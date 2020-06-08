import {NgModule} from '@angular/core';

import {ThemeModule} from '../../@theme/theme.module';
import {AOtpadComponent} from './aotpad.component';
import {AOtpadRoutingModule} from './aotpad-routing.module';
import {DodajOtpadComponent} from './dodaj-otpad/dodaj-otpad.component';
import {
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbInputModule,
  NbRadioModule,
  NbSelectModule,
} from '@nebular/theme';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {KatalogService} from '../../@core/service/katalog.service';
import {FormsModule} from '@angular/forms';
import {AOtpadService} from '../../@core/service/aotpad.service';
import {AmblazaService} from '../../@core/service/amblaza.service';
import {DodajAmbalazuComponent} from './dodaj-ambalazu/dodaj-ambalazu.component';

@NgModule({
  imports: [
    ThemeModule,
    AOtpadRoutingModule,
    NbCardModule,
    NbInputModule,
    NbSelectModule,
    NbCheckboxModule,
    Ng2SmartTableModule,
    NbButtonModule,
    FormsModule,
    NbRadioModule,
  ],
  declarations: [
    AOtpadComponent,
    DodajOtpadComponent,
    DodajAmbalazuComponent,
  ],
  providers: [KatalogService, AOtpadService, AmblazaService],
})
export class AotpadModule {
}
