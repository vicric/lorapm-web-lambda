import { Injectable } from '@angular/core';
import { ProjectService } from './project.service';
import { ITask, Task } from '../_models/task';
import { Project } from '../_models/project';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private user;
  private currentProject;

  constructor(
    private projectService: ProjectService
  ) {
    this.projectService.currentProject.subscribe(y =>
      {
        this.setProject(y);
      });
  }

  getAll(): any{

  }

  get(key: string) : any{
  }

  addTask(cat: ITask) : any {

  }

  update(key: string, cat: ITask) : any{
  }

  delete(key: string) : any{
  }

  // private methods


  private setProject(project:Project){
    this.currentProject = project
  }

}
