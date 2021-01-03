import { Injectable } from '@angular/core';
import { ICategory } from '../_models/category';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

const baseUrl = `${environment.apiUrl}/categories`;

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private http: HttpClient
    ) { }

  getAll(): Observable<ICategory[]>{
    return this.http.get<ICategory[]>(baseUrl).pipe(
      catchError(this.handleError)
    );
  }

  get(id: number) : Observable<any>{
    return this.http.get<ICategory>(`${baseUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  create(cat: string) : Observable<any>{
    return this.http.post<ICategory>(baseUrl, cat).pipe(
      catchError(this.handleError)
    );
  }

  update(id: number, cat: string) : Observable<any>{
    return this.http.put<ICategory>(`${baseUrl}/${id}`, cat).pipe(
      catchError(this.handleError)
    );
  }

  delete(id: number) : Observable<any>{
    return this.http.delete<ICategory>(`${baseUrl}/${id}`).pipe(
      catchError(this.handleError)
    )
  }

  handleError(error: HttpErrorResponse){
    return throwError(error.message);
  }

}
