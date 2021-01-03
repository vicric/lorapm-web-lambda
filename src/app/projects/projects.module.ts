import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { ProjectsRoutingModule } from './projects-routing.module';

import { ProjectFormComponent } from './project-form.component';


@NgModule({
    imports: [
        CommonModule,
        // BrowserAnimationsModule,
        ProjectsRoutingModule,
        ReactiveFormsModule,
        FormsModule
    ],
    declarations: [
      ProjectFormComponent,
    ]
})
export class ProjectsModule { }
