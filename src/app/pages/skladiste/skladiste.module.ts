import { NgModule } from '@angular/core';
import { KatalogService } from '../../@core/service/katalog.service';
import { RoleService } from '../../@core/service/role.service';
import { ThemeModule } from '../../@theme/theme.module';
import { SkladisteComponent } from './skladiste.component';
import { SkladisteService } from '../../@core/service/skladiste.service';
import {
  NbAutocompleteModule, NbButtonModule,
  NbCardModule,
  NbInputModule,
  NbListModule,
  NbPopoverModule, NbProgressBarModule,
  NbSelectModule,
} from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FormsModule } from '@angular/forms';
import { SkladisteProizvodnjaComponent } from './skladiste-proizvodnja/skladiste-proizvodnja.component';
import { SkladisteTretmanComponent } from './skladiste-tretman/skladiste-tretman.component';
import { SkladisteDeponijaComponent } from './skladiste-deponija/skladiste-deponija.component';
import { SkladisteSkladistenjeComponent } from './skladiste-skladistenje/skladiste-skladistenje.component';

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
    NbProgressBarModule,
  ],
  declarations: [
    SkladisteComponent,
    SkladisteProizvodnjaComponent,
    SkladisteTretmanComponent,
    SkladisteDeponijaComponent,
    SkladisteSkladistenjeComponent,
  ],
  providers: [SkladisteService,
    RoleService, KatalogService],
})
export class SkladisteModule {
}
