import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarComponent } from './calendar.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [CalendarComponent],
  imports: [CommonModule, IonicModule, CalendarRoutingModule],
})
export class CalendarModule {}
