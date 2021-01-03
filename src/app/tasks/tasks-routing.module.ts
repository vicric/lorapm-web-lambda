import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TasksComponent } from './tasks.component';
import { TaskFormComponent } from './task-form.component';

const routes: Routes = [
  {
    path: '', component: TasksComponent,
    // children: [
    //   { path: 'task', component: TaskFormComponent },
    //   // { path: 'project-form/:id', component: ProjectFormComponent }
    // ]
  },
  {path: 'task/:id', component:TaskFormComponent},
  {path: 'task', component:TaskFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule { }
