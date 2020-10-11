import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { BASE_URL } from 'src/environments/environment';
import { MCategoria } from '../models/categoria.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  path = 'categorias';
  constructor(private http: HttpClient) { }

  listAll(): Observable<MCategoria[]> {
    return this.http.get<MCategoria[]>(BASE_URL + this.path).pipe(
      retry(2),
      catchError(this.errorHandl)
    );
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
    return throwError(error);
 }
}
