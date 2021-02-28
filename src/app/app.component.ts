import { Component } from '@angular/core';

import { AccountService } from './_services';
import { Role, Account } from './_models';
import { ProjectService } from './_services/project.service';
import { Project, ProjectPhase } from './_models/project';

import { ProjectsModule } from './projects/projects.module';
import { ProjectsComponent } from './projects/projects.component';
import { MatDialog } from '@angular/material/dialog';

import { ProjectPhaseDialogComponent } from './projects/project-phase-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'lorapm-web';

  Role = Role;
  account: Account;
  currentProject: Project;

  constructor(
    private accountService: AccountService,
    private projectService: ProjectService,
    private _dialog: MatDialog
    ) {
    this.accountService.account.subscribe(x => this.account = x);
    this.projectService.currentProject.subscribe(y => this.setProject(y));
  }

  logout() {
    this.accountService.logout();
  }

  setProject(project:Project){
    this.currentProject = project;
    console.log({project});
    alert("Version 28.02")
  }

  openProjectPhaseDialog() : void {
    const dialogRef = this._dialog.open(ProjectPhaseDialogComponent, {
      width: '500px',
      data: this.currentProject
    });

    dialogRef.afterClosed().subscribe(result => {
      window.location.reload();
    });
  }
}
