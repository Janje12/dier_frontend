import { NgModule } from '@angular/core';
import { KatalogService } from '../../@core/service/katalog.service';
import { RoleService } from '../../@core/service/role.service';

import { ThemeModule } from '../../@theme/theme.module';
import { SKLADISTE_SETTINGS } from './skladiste-settings';
import { SkladisteComponent } from './skladiste.component';
import { SkladisteService } from '../../@core/service/skladiste.service';
import {
  NbAutocompleteModule, NbButtonModule,
  NbCardModule,
  NbInputModule,
  NbListModule,
  NbPopoverModule,
  NbSelectModule,
} from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FormsModule } from '@angular/forms';
import { SkladisteProizvodnjaComponent } from './skladiste-proizvodnja/skladiste-proizvodnja.component';
import { SkladisteTretmanComponent } from './skladiste-tretman/skladiste-tretman.component';

@NgModule({
  imports: [
    ThemeModule,
    NbCardModule,
    Ng2SmartTableModule,
    FormsModule,
    NbInputModule,
    NbPopoverModule,
    NbListModule,
    NbSelectModule,
    NbAutocompleteModule,
    NbButtonModule,
  ],
  declarations: [
    SkladisteComponent,
    SkladisteProizvodnjaComponent,
    SkladisteTretmanComponent,
  ],
  providers: [SkladisteService,
    RoleService, KatalogService],
})
export class SkladisteModule {
}
