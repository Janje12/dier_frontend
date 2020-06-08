import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {DodajOtpadComponent} from './dodaj-otpad/dodaj-otpad.component';
import {NotpadComponent} from './notpad.component';
import {DodajNaSkladisteComponent} from './dodaj-na-skladiste/dodaj-na-skladiste.component';

const routes: Routes = [
  {
    path: '',
    component: NotpadComponent,
    children: [
      {
        path: 'dodaj-otpad',
        component: DodajOtpadComponent,
      },
      {
        path: 'dodaj-na-skladiste',
        component: DodajNaSkladisteComponent,
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
