import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ProjectService } from '../_services/project.service';
import { IProject, ProjectPhase } from '../_models/project';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html'
})
export class ProjectFormComponent implements OnInit {

  myForm: FormGroup;
  id: number;
  isAddMode: boolean;

  // projectPhases = ProjectPhase;
  // enumKeys = [];

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar
  )
  {
    // this.enumKeys = Object.keys(this.projectPhases).filter(f => !isNaN(Number(f)));
  }

  currentProject: IProject;

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    this.myForm = this.fb.group({
      projectName: ['', Validators.required],
      projectDescription: '',
      activeProjectPhase: '',
      clientCompany: '',
      projectLeader: '',
      contingencyLimit: 0
    });

    this.myForm.valueChanges.subscribe(console.log);

    if (!this.isAddMode){
      this.projectService.getProject(this.id).subscribe(
        data => {
          this.myForm.patchValue(data);
        },
        error => alert(error)
      );
    }
  }

  get projectName () {
    return this.myForm.get('projectName');
  }

  get projectDescription () {
    return this.myForm.get('projectDescription');
  }

  get activeProjectPhase () {
    return this.myForm.get('activeProjectPhase');
  }

  get clientCompany () {
    return this.myForm.get('clientCompany');
  }

  get projectLeader () {
    return this.myForm.get('projectLeader');
  }

  get contingencyLimit () {
    return this.myForm.get('contingencyLimit');
  }

  async submitHandler() {
    if (this.isAddMode) {
      this.createProject();
    } else {
      this.updateProject();
    }
  }

  private updateProject() {
    const formValue = this.myForm.value;

    try {
      this.projectService.updateProject(this.id, formValue).subscribe(
        data => {

          // this.router.navigateByUrl('');
          this._snackBar.open('Project updated', 'End now');
        },
        error =>{
          alert(error);
        });
    } catch (err) {
      console.error(err);
    }
  }

  private createProject() {
    const formValue = this.myForm.value;

    try {
      this.projectService.addProject(formValue).subscribe(
        data => {
          this.router.navigateByUrl('');
          this._snackBar.open('Project created', 'End now');
          this.projectService.emitProjectCreated();
        },
        error =>{
          alert(error);
        });
    } catch (err) {
      console.error(err);
    }
  }

  public deleteProject(id: number) {
    try {
      this.projectService.deleteProject(id).subscribe(
        data => {
          this.router.navigateByUrl('');
          this._snackBar.open('Project deleted', 'End now');
          this.projectService.emitProjectDeleted();
        },
        error =>{
          alert(error);
        });
    } catch (err) {
      console.error(err);
    }

  }

}
