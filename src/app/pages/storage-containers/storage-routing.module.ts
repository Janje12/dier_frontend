import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StorageContainersComponent } from './storage-containers.component';

const routes: Routes = [
  {
    path: '',
    component: StorageContainersComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StorageRoutingModule {
}
