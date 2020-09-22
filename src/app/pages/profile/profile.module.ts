import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NbCardModule, NbInputModule, NbProgressBarModule, NbTabsetModule } from '@nebular/theme';
import { ProfileDozvolaComponent } from './profile-dozvola/profile-dozvola.component';
import { ProfileFirmaComponent } from './profile-firma/profile-firma.component';
import { ProfileKorisnikComponent } from './profile-korisnik/profile-korisnik.component';
import { ProfilePrevoznoSredstvoComponent } from './profile-prevozno-sredstvo/profile-prevozno-sredstvo.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileSkladisteComponent } from './profile-skladiste/profile-skladiste.component';
import { ProfileComponent } from './profile.component';

@NgModule({
  declarations: [
    ProfileComponent,
    ProfileFirmaComponent,
    ProfileDozvolaComponent,
    ProfileKorisnikComponent,
    ProfilePrevoznoSredstvoComponent,
    ProfileSkladisteComponent,
  ],
  imports: [
    ProfileRoutingModule,
    CommonModule,
    FormsModule,
    NbInputModule,
    NbProgressBarModule,
    NbTabsetModule,
    NbCardModule,
  ],
})
export class ProfileModule {
}
