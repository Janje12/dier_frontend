import { NgModule } from '@angular/core';
import { DozvolaService } from '../../@core/service/dozvola.service';
import { ThemeModule } from '../../@theme/theme.module';
import { NotpadComponent } from './notpad.component';
import { NotpadRoutingModule } from './notpad-routing.module';
import { DodajOtpadComponent } from './dodaj-proizvodnja/dodaj-otpad.component';
import { NbButtonModule, NbCardModule, NbCheckboxModule, NbInputModule, NbSelectModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { KatalogService } from '../../@core/service/katalog.service';
import { FormsModule } from '@angular/forms';
import { NOtpadService } from '../../@core/service/notpad.service';
import { DodajTretmanComponent } from './dodaj-tretman/dodaj-tretman.component';
import { DodajDeponijaComponent } from './dodaj-deponija/dodaj-deponija.component';
import { DodajSkladistenjeComponent } from './dodaj-skladistenje/dodaj-skladistenje.component';

@NgModule({
  imports: [
    ThemeModule,
    NotpadRoutingModule,
    NbCardModule,
    NbInputModule,
    NbSelectModule,
    NbCheckboxModule,
    Ng2SmartTableModule,
    NbButtonModule,
    FormsModule,
  ],
  declarations: [
    NotpadComponent,
    DodajOtpadComponent,
    DodajTretmanComponent,
    DodajDeponijaComponent,
    DodajSkladistenjeComponent,
  ],
  providers: [
    KatalogService,
    NOtpadService,
    DozvolaService,
  ],
})
export class NotpadModule {
}
