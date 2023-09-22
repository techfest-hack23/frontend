import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessagesRoutingModule } from './messages-routing.module';
import { MessagesComponent } from './messages.component';
import { MessagesInboxComponent } from './messages-inbox/messages-inbox.component';
import { MessagesSentComponent } from './messages-sent/messages-sent.component';
import { SharedModule } from '@app/@shared';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [MessagesComponent, MessagesInboxComponent, MessagesSentComponent],
  imports: [CommonModule, SharedModule, FormsModule, ReactiveFormsModule, IonicModule, MessagesRoutingModule],
})
export class MessagesModule {}
