import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Project } from '../_models/project';
import { ProjectService } from '../_services/project.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-switch-project-dialog',
  templateUrl: './switch-project-dialog.component.html'
})
export class SwitchProjectDialogComponent{

  constructor(
    private _projectService: ProjectService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<SwitchProjectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Project
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  switchProject(): void {
    this.dialogRef.close();

    this._projectService.setCurrentProject(this.data.id).subscribe(
      data => {
    },
    error =>{
      alert(error);
    });
  }

}
