import { Component, OnInit } from '@angular/core';
import { TaskService } from '../_services/task.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ITask, Task } from '../_models/task';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html'
})
export class TasksComponent implements OnInit {

  tasks: ITask[];

  constructor(
    private taskService: TaskService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.refreshTasks();
   }

  ngOnInit(): void {
  }

  deleteTask(event, item) {
    try {
      var task = item as Task;
      if (task.key) {
        this.taskService.delete(task.key)
          .then(() => {
            this.refreshTasks();
            this._snackBar.open(task.name + ' deleted', 'End now');
          })
          .catch(err => console.log(err));
      }
    } catch (err) {
      console.error(err);
    }
  }

  refreshTasks(){
    // this.taskService.getAll().snapshotChanges().pipe(
    //   map(changes =>
    //     changes.map(c =>
    //       ({ key: c.payload.key, ...c.payload.val() })
    //     )
    //   )
    // ).subscribe(data => {
    //   this.tasks = data;
    //   console.log(this.tasks)
    // });
  }
}
