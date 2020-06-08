import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {DodajOtpadComponent} from './dodaj-otpad/dodaj-otpad.component';
import {AOtpadComponent} from './aotpad.component';
import {DodajAmbalazuComponent} from './dodaj-ambalazu/dodaj-ambalazu.component';

const routes: Routes = [
  {
    path: '',
    component: AOtpadComponent,
    children: [
      {
        path: 'dodaj-otpad',
        component: DodajOtpadComponent,
      },
      {
        path: 'dodaj-ambalazu',
        component: DodajAmbalazuComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AOtpadRoutingModule {
}
