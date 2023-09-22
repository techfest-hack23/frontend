import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { TasksComponent } from './tasks.component';
import { SharedModule } from '@app/@shared';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskDetailsComponent } from './task-details/task-details.component';

@NgModule({
  declarations: [TasksComponent, TaskDetailsComponent],
  imports: [CommonModule, SharedModule, IonicModule, FormsModule, ReactiveFormsModule, TasksRoutingModule],
})
export class TasksModule {}
