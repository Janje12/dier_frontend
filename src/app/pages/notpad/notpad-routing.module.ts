import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DodajDeponijaComponent } from './dodaj-deponija/dodaj-deponija.component';
import { DodajOtpadComponent } from './dodaj-proizvodnja/dodaj-otpad.component';
import { DodajSkladistenjeComponent } from './dodaj-skladistenje/dodaj-skladistenje.component';
import { DodajTretmanComponent } from './dodaj-tretman/dodaj-tretman.component';
import { NotpadComponent } from './notpad.component';

const routes: Routes = [
  {
    path: '',
    component: NotpadComponent,
    children: [
      {
        path: 'dodaj-proizvodnja',
        component: DodajOtpadComponent,
      },
      {
        path: 'dodaj-tretman',
        component: DodajTretmanComponent,
      },
      {
        path: 'dodaj-deponija',
        component: DodajDeponijaComponent,
      },
      {
        path: 'dodaj-skladistenje',
        component: DodajSkladistenjeComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotpadRoutingModule {
}
