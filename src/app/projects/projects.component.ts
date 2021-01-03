import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProjectService } from '../_services/project.service';
import { IProject, Project } from '../_models/project';
import { MatDialog } from '@angular/material/dialog';
import { SwitchProjectDialogComponent } from './switch-project-dialog.component';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html'
})
export class ProjectsComponent implements OnInit {

  constructor(
    private accountService:AccountService,
    private projectService:ProjectService,
    private router:Router,
    private _snackBar: MatSnackBar,
    private _dialog: MatDialog
    ) { }

  currentProject: IProject;
  otherProjects: IProject[];

  ngOnInit(): void {
    this.refreshCurrentProject();
    this.refreshOtherProjects();

    this.projectService.projectCreated.subscribe(e => {
      this.refreshCurrentProject();
      this.refreshOtherProjects();
    });
    this.projectService.projectDeleted.subscribe(e => {
      window.location.reload();
    });
  }

  openDialog(project: Project) : void {
    const dialogRef = this._dialog.open(SwitchProjectDialogComponent, {
      width: '500px',
      data: project
    });

    dialogRef.afterClosed().subscribe(result => {
      window.location.reload();
    });
  }

  refreshOtherProjects(){
    this.projectService.getOtherProjects().subscribe(
      data => {this.otherProjects = data;
      },
      error =>{
        alert(error);
      });
  }

  refreshCurrentProject(){
    this.projectService.getCurrentProject().subscribe(
      data => {this.currentProject = data;
      },
      error =>{
        alert(error);
      });
  }
}
