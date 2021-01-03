import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IProject, Project, ProjectPhase } from '../_models/project';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const baseUrl = `${environment.apiUrl}/projects`;

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private currentProjectSubject: BehaviorSubject<Project>;
  public currentProject: Observable<Project>;

  @Output() projectCreated: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() projectDeleted: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private http: HttpClient) {
    this.currentProjectSubject = new BehaviorSubject<Project>(null);
    this.currentProject = this.currentProjectSubject.asObservable();

  }

  getProjects(): Observable<IProject[]>{
    return this.http.get<IProject[]>(baseUrl).pipe(
      catchError(this.handleError)
    );
  }

  getCurrentProject() : Observable<any>{
    return this.http.get<any>(`${baseUrl}/current`)
    .pipe(map(project => {
      this.currentProjectSubject.next(project);
      return project;
    }));
  }

  getOtherProjects(): Observable<IProject[]>{
    return this.http.get<IProject[]>(`${baseUrl}/notcurrent`).pipe(
      catchError(this.handleError)
    );
  }

  getProject(id: number) : Observable<any>{
    return this.http.get<IProject>(`${baseUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  addProject(cat: string) : Observable<any>{
    return this.http.post<IProject>(baseUrl, cat).pipe(
      catchError(this.handleError)
    );
  }

  updateProject(id: number, cat: string) : Observable<any>{
    return this.http.put<IProject>(`${baseUrl}/${id}`, cat).pipe(
      catchError(this.handleError)
    );
  }

  setCurrentProject(id: number) : Observable<any>{
    return this.http.put<IProject>(`${baseUrl}/${id}/setcurrent`, null).pipe(
      catchError(this.handleError)
    );
  }

  setProjectPhase(id: number, cat: object) : any{
    alert(JSON.stringify(cat));
    return this.http.put<IProject>(`${baseUrl}/${id}`, cat).pipe(
      catchError(this.handleError)
    );
  }

  deleteProject(id: number) : Observable<any>{
    return this.http.delete<IProject>(`${baseUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  handleError(error: HttpErrorResponse){
    alert(error.message)
    return throwError(error.message);
  }

  emitProjectCreated() : void {
    this.projectCreated.emit(true);
  }

  emitProjectDeleted() : void {
    this.projectDeleted.emit(true);
  }

  // helpers


}
