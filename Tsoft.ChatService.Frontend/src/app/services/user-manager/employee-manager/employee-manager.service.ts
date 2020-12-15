import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { _HttpClient } from '@delon/theme';
import { environment } from '@env/environment';
import { employeeManagerRouter } from 'src/app/utils';
@Injectable({
  providedIn: 'root'
})
export class EmployeeManagerService {

  constructor(private httpClient: _HttpClient) { }
  getListEmloyee(currentPage: number, pageSize: number, queryString: string): Observable<any> {
    return this.httpClient.get(
      environment.BASE_API_URL +
      employeeManagerRouter.getListEmployee +
      "?currentPage=" +
      currentPage +
      "&pageSize=" +
      pageSize +
      "&queryString=" +
      queryString,
    );
  }
  getList(currentPage: number, pageSize: number, queryString: string): Observable<any> {
    return this.httpClient.get(
      environment.BASE_API_URL +
      employeeManagerRouter.getListEmployee +
      "?currentPage=" +
      currentPage +
      "&pageSize=" +
      pageSize +
      "&queryString=" +
      queryString
    );
  }
  createEmployee(data: any): Observable<any> {
    return this.httpClient.post(environment.BASE_API_URL + employeeManagerRouter.createEmployee, data);
  }
  getDetailEmployee(id: any): Observable<any> {
    return this.httpClient.get(environment.BASE_API_URL + employeeManagerRouter.getDetailEmployee + '/' + id);
  }
  updateEmployee(id: any, data: any): Observable<any> {
    return this.httpClient.put(environment.BASE_API_URL + employeeManagerRouter.updateEmployee + '/' + id, data);
  }
  deleteManyEmployee(data: any): Observable<any> {
    return this.httpClient.post(environment.BASE_API_URL + employeeManagerRouter.deleteEmployee, data);
  }
}
