import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {OotpadComponent} from './ootpad.component';
import {DodajOtpadComponent} from './dodaj-otpad/dodaj-otpad.component';

const routes: Routes = [
  {
    path: '',
    component: OotpadComponent,
    children: [
      {
        path: 'dodaj-otpad',
        component: DodajOtpadComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OotpadRoutingModule {
}
