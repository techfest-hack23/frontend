import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProviderRoutingModule } from './provider-routing.module';
import { ProviderComponent } from './provider.component';
import { ClientsComponent } from './components/clients/clients.component';

@NgModule({
  declarations: [ProviderComponent, ClientsComponent],
  imports: [CommonModule, ProviderRoutingModule],
})
export class ProviderModule {}
