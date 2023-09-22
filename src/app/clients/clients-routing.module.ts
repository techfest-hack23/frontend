import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsComponent } from './clients.component';
import { ClientDetailsComponent } from './client-details/client-details.component';

const routes: Routes = [
  { path: '', component: ClientsComponent },
  {
    path: 'details/:id',
    component: ClientDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientsRoutingModule {}
