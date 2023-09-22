import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProvidersRoutingModule } from './providers-routing.module';
import { ProvidersComponent } from './providers.component';
import { SharedModule } from '@app/@shared';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ProvidersComponent],
  imports: [CommonModule, SharedModule, IonicModule, FormsModule, ReactiveFormsModule, ProvidersRoutingModule],
})
export class ProvidersModule {}
