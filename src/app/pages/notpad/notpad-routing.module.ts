import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DodajOtpadComponent } from './dodaj-proizvodnja/dodaj-otpad.component';
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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotpadRoutingModule {
}
