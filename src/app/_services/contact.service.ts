import { Injectable } from '@angular/core';
import { IContact } from '../_models/contact';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

const baseUrl = `${environment.apiUrl}/contacts`;

@Injectable({
  providedIn: 'root'
})
export class ContactService {


  constructor(private http: HttpClient) {

  }

  getContacts(): Observable<IContact[]>{
    return this.http.get<IContact[]>(baseUrl).pipe(
      catchError(this.handleError)
    );
  }

  getContact(id: number) : Observable<any>{
    return this.http.get<IContact>(`${baseUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  addContact(cat: string) : Observable<any>{
    return this.http.post<IContact>(baseUrl, cat).pipe(
      catchError(this.handleError)
    );
  }

  updateContact(id: number, cat: string) : Observable<any>{
    return this.http.put<IContact>(`${baseUrl}/${id}`, cat).pipe(
      catchError(this.handleError)
    )
  }

  deleteContact(id: number) : any{
    return this.http.delete<IContact>(`${baseUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  handleError(error: HttpErrorResponse){
    return throwError(error.message);
  }
}
