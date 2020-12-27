import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { _HttpClient } from '@delon/theme';
import { environment } from '@env/environment';
import { employeeRouter } from 'src/app/utils';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private httpClient: _HttpClient) { }
  getListEmloyee(currentPage: number, pageSize: number, sort: string, filter: string): Observable<any> {
    return this.httpClient.get(
      environment.BASE_API_URL +
      employeeRouter.getEmployee +
      "?currentPage=" +
      currentPage +
      "&pageSize=" +
      pageSize +
      "&filter=" +
      filter +
      "&sort=" +
      sort
    );
  }
  deleteEmployee(data: any): Observable<any> {
    return this.httpClient.post(environment.BASE_API_URL + employeeRouter.deleteEmployee, data);
  }
}
