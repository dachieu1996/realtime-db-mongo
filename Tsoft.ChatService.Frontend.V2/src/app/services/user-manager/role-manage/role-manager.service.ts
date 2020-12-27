import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { _HttpClient } from '@delon/theme';
import { environment } from '@env/environment';
import { roleManagerRouter } from 'src/app/utils';


@Injectable({
  providedIn: 'root'
})
export class RoleManagerService {

  constructor(private httpClient: _HttpClient) { }
  getList(currentPage: number, pageSize: number, queryString: string): Observable<any> {
    return this.httpClient.get(
      environment.BASE_API_URL +
      roleManagerRouter.getListRole +
      "?currentPage=" +
      currentPage +
      "&pageSize=" +
      pageSize +
      "&queryString=" +
      queryString
    );
  }
  getListRole(): Observable<any> {
    return this.httpClient.get(
      environment.BASE_API_URL +
      roleManagerRouter.getRole
    );
  }
  createRole(data: any): Observable<any> {
    return this.httpClient.post(environment.BASE_API_URL + roleManagerRouter.createRole, data);
  }
  getDetailRole(id: any): Observable<any> {
    return this.httpClient.get(environment.BASE_API_URL + roleManagerRouter.getDetailRole + '/' + id);
  }
  updateRole(id: any, data: any): Observable<any> {
    return this.httpClient.put(environment.BASE_API_URL + roleManagerRouter.updateRole + '/' + id, data);
  }

  deleteManyRole(data: any): Observable<any> {
    return this.httpClient.post(environment.BASE_API_URL + roleManagerRouter.deleteManyRole, data);
  }
}
