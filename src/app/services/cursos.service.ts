import { Injectable } from '@angular/core';
import { httpOptions, BASE_URL } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { MCursos } from '../models/curso.model';


@Injectable({
  providedIn: 'root'
})
export class CursosService {
  path = 'cursos';
  constructor(private http: HttpClient) { }

  listAll(): Observable<MCursos[]> {
    return this.http.get<MCursos[]>(BASE_URL + this.path).pipe(
      retry(2),
      catchError(this.errorHandl)
    )
  }

  errorHandl(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
 }
}
