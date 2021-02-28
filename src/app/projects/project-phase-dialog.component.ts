import { Component, OnInit, Inject } from '@angular/core';
import { ProjectService } from '../_services/project.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { Project, ProjectPhase } from '../_models/project';

@Component({
  selector: 'app-project-phase-dialog',
  templateUrl: './project-phase-dialog.component.html'
})
export class ProjectPhaseDialogComponent {

  constructor(
    private _projectService: ProjectService,
    public dialogRef: MatDialogRef<ProjectPhaseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Project
  ) { }

  onCancel(): void {
    this.dialogRef.close();
  }

  goToPhase(phase : number): void {
    this.dialogRef.close();

    let model = {
      id: this.data.id,
      activeProjectPhase: phase
    }

    this._projectService.setProjectPhase(this.data.id, model).subscribe(
      data => {
    },
    error =>{
      alert(error);
    });

  }

}
