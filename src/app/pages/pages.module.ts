import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  NbButtonModule,
  NbCardModule,
  NbFormFieldModule,
  NbIconModule, NbInputModule,
  NbMenuModule, NbPopoverModule, NbProgressBarModule,
  NbTabsetModule, NbToastrService,
} from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { DozvolaService } from '../@core/service/dozvola.service';
import { FirmaService } from '../@core/service/firma.service';
import { KorisnikService } from '../@core/service/korisnik.service';
import { PrevoznoSredstvoService } from '../@core/service/prevoznoSredstvo.service';
import { RoleService } from '../@core/service/role.service';
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
import { ProfileKorisnikComponent } from './profile/profile-korisnik/profile-korisnik.component';
import { ProfileFirmaComponent } from './profile/profile-firma/profile-firma.component';
import { ProfileSkladisteComponent } from './profile/profile-skladiste/profile-skladiste.component';
import { ProfileDozvolaComponent } from './profile/profile-dozvola/profile-dozvola.component';
import { ProfilePrevoznoSredstvoComponent } from './profile/profile-prevozno-sredstvo/profile-prevozno-sredstvo.component';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    NbButtonModule,
    DashboardModule,
    NotpadModule,
    OotpadModule,
    PtotpadModule,
    AotpadModule,
    SkladisteModule,
    NbCardModule,
    NbTabsetModule,
    NbIconModule,
    FormsModule,
    NbFormFieldModule,
    NbInputModule,
    NbProgressBarModule,
    NbPopoverModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    PagesComponent,
    ProfileComponent,
    ProfileKorisnikComponent,
    ProfileFirmaComponent,
    ProfileSkladisteComponent,
    ProfileDozvolaComponent,
    ProfilePrevoznoSredstvoComponent,
  ],
  providers: [KorisnikService,
    RoleService,
    NbToastrService,
    FirmaService,
    DozvolaService,
    PrevoznoSredstvoService,
  ],
})
export class PagesModule {
}
