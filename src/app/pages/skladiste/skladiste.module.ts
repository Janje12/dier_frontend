import {NgModule} from '@angular/core';

import {ThemeModule} from '../../@theme/theme.module';
import {SkladisteComponent} from './skladiste.component';
import {SkladisteService} from '../../@core/service/skladiste.service';
import {NbCardModule} from '@nebular/theme';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    ThemeModule,
    NbCardModule,
    Ng2SmartTableModule,
    FormsModule,
  ],
  declarations: [
    SkladisteComponent,
  ],
  providers: [SkladisteService],
})
export class SkladisteModule {
}
