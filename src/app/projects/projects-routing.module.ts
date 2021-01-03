import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjectFormComponent } from './project-form.component';


const routes: Routes = [
    {

      path: '',
        children: [
          { path: 'project-form', component: ProjectFormComponent },
          { path: 'project-form/:id', component: ProjectFormComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProjectsRoutingModule { }
