import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentsRoutingModule } from './documents-routing.module';
import { DocumentsComponent } from './documents.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [DocumentsComponent],
  imports: [CommonModule, IonicModule, DocumentsRoutingModule],
})
export class DocumentsModule {}
