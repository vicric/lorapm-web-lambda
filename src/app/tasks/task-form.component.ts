import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { getLocaleDateTimeFormat } from '@angular/common';
import { TaskService } from '../_services/task.service';
import { map } from 'rxjs/operators';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import * as moment from 'moment';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ITask } from '../_models/task';
import { ICategory } from '../_models';
import { CategoryService } from '../_services';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html'
})
export class TaskFormComponent implements OnInit {


  myForm: FormGroup;
  id: string;
  isAddMode: boolean;

  categories: ICategory[];

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    // this.categoryService.getAll().snapshotChanges().pipe(
    //   map(changes =>
    //     changes.map(c =>
    //       ({ key: c.payload.key, ...c.payload.val() })
    //     )
    //   )
    // ).subscribe(data => {
    //   this.categories = data;
    // });

    this.myForm = this.fb.group({
      name: ['', Validators.required],
      description: '',
      estimatedTimeInHours: 0,
      category: null
    });

    this.myForm.valueChanges.subscribe(console.log);

    if (!this.isAddMode){
      // this.taskService.get(this.id).snapshotChanges().pipe(
      //   map(c =>
      //     ({ key: c.payload.key, ...c.payload.val() })
      //   )
      // ).subscribe(data => {
      //   this.myForm.patchValue(data);
      // });
    }
  }

  get name () {
    return this.myForm.get('name');
  }

  get description () {
    return this.myForm.get('description');
  }

  get estimatedTimeInHours () {
    return this.myForm.get('estimatedTimeInHours');
  }

  // get startingDate () {
  //   return this.myForm.get('startingDate');
  // }

  // get dueDate () {
  //   return this.myForm.get('dueDate');
  // }

  async submitHandler() {
    if (this.isAddMode) {
      this.createTask();
    } else {
      this.updateTask();
    }
  }

  private createTask() {
    const formValue = this.myForm.value;
    try {
      this.taskService.addTask(formValue).then(
        data => {
          this.router.navigateByUrl('tasks');
          this._snackBar.open('Task created', 'End now');
          // this.projectService.emitProjectCreated();
        },
        error =>{
          alert(error);
        });
    } catch (err) {
      console.error(err);
    }
  }

  private updateTask() {
    const formValue = this.myForm.value;

    try {
      if (this.id) {
        this.taskService.update(this.id, formValue)
          .then(() => {
            this._snackBar.open('Task updated', 'End now');
          })
          .catch(err => console.log(err));
      }
    } catch (err) {
      console.error(err);
    }
  }

  public deleteTask(id: string) {
    try {
      if (id) {
        this.taskService.delete(id)
          .then(() => {
            this._snackBar.open('Task deleted', 'End now');
            this.router.navigateByUrl('/tasks');
            // this.projectService.emitProjectDeleted();
          })
          .catch(err => console.log(err));
      }
    } catch (err) {
      console.error(err);
    }

  }

}
