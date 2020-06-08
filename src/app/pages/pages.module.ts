import { NgModule } from '@angular/core';
import { NbCardModule, NbMenuModule } from '@nebular/theme';
import { KorisnikService } from '../@core/service/korisnik.service';

import { ThemeModule } from '../@theme/theme.module';
import { AotpadModule } from './aotpad/aotpad.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { NotpadModule } from './notpad/notpad.module';
import { OotpadModule } from './ootpad/ootpad.module';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { ProfileComponent } from './profile/profile.component';
import { PtotpadModule } from './ptotpad/ptopad.module';
import { SkladisteModule } from './skladiste/skladiste.module';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    NotpadModule,
    OotpadModule,
    PtotpadModule,
    AotpadModule,
    SkladisteModule,
    NbCardModule,
  ],
  declarations: [
    PagesComponent,
    ProfileComponent,
  ],
  providers: [KorisnikService],
})
export class PagesModule {
}
