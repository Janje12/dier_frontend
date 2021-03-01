import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddSpecialWasteComponent } from './add-special-waste/add-special-waste.component';
import { AddTrashComponent } from './add-trash/add-trash.component';
import { TrashComponent } from './trash.component';

const routes: Routes = [
  {
    path: '',
    component: TrashComponent,
    children: [
      {
        path: 'specialwaste/:operation',
        component: AddSpecialWasteComponent,
      },
      {
        path: ':trashType/:operation',
        component: AddTrashComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrashRoutingModule {
}
