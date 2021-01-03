import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { TasksComponent } from './tasks.component';
import { TaskFormComponent } from './task-form.component';
import { AppMaterialModule } from '../app-material/app-material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [TasksComponent, TaskFormComponent],
  imports: [
    CommonModule,
    AppMaterialModule,
    TasksRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class TasksModule { }
