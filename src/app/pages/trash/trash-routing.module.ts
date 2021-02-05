import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTrashComponent } from './add-trash/add-trash.component';
import { TrashComponent } from './trash.component';

const routes: Routes = [
  {
    path: '',
    component: TrashComponent,
    children: [
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
