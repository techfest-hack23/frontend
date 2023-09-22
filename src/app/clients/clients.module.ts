import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsRoutingModule } from './clients-routing.module';
import { ClientsComponent } from './clients.component';
import { SharedModule } from '@app/@shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ClientDetailsComponent } from './client-details/client-details.component';

@NgModule({
  declarations: [ClientsComponent, ClientDetailsComponent],
  imports: [CommonModule, SharedModule, FormsModule, ReactiveFormsModule, IonicModule, ClientsRoutingModule],
})
export class ClientsModule {}
