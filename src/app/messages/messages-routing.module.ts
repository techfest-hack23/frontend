import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MessagesComponent } from './messages.component';
import { MessageDetailsComponent } from './message-details/message-details.component';

const routes: Routes = [
  { path: '', component: MessagesComponent },
  {
    path: 'details/:id',
    component: MessageDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MessagesRoutingModule {}
