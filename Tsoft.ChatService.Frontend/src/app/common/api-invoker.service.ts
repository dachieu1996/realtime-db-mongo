import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError, filter } from 'rxjs/operators';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root',
})
export class ApiInvokerService {
  constructor(private http: HttpClient) {}
  get(element: any, url): Observable<any> {
    const httpPackage = {
      params: element,
    };
    return this.http.get(url, httpPackage).pipe(catchError(this.handleError<any>()));
  }
  /* Post */
  post<T>(element: T, url: string): Observable<T> {
    return this.http.post<T>(url, element, httpOptions).pipe(
      tap((data: T) => {}),
      catchError(this.handleError<T>('')),
    );
  }
  postFormData<T>(element: T, url: string) {
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data' }),
      //  observe: 'events',
    };
    return this.http.post<T>(url, element, options).pipe(
      tap((data: T) => {}),
      catchError(this.handleError<T>('')),
    );
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
