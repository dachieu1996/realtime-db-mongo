import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { customerManagerRouter } from 'src/app/utils';

@Injectable({
  providedIn: 'root'
})
export class CustomerManagerService {

  constructor(private httpClient: _HttpClient) { }

  getList(page: number, size: number, sort: string, filter: string): Observable<any> {
    return this.httpClient.get(
      environment.BASE_API_URL +
      customerManagerRouter.getCustomer +
      "?page=" +
      page +
      "&size=" +
      size +
      "&filter=" +
      filter +
      "&sort=" +
      sort
    );
  }

  createCustomer(dataPost: any): Observable<any> {
    return this.httpClient.post(
      environment.BASE_API_URL +
      customerManagerRouter.create, dataPost);
  }

  getCustomerById(id): Observable<any> {
    return this.httpClient.get(
      environment.BASE_API_URL +
      customerManagerRouter.create + '/' + id);
  }

  editCustomer(id, dataPost): Observable<any> {
    return this.httpClient.put(
      environment.BASE_API_URL +
      customerManagerRouter.edit + '/' + id, dataPost);
  }

  deleteCustomer(listIds): Observable<any> {
    return this.httpClient.post(
      environment.BASE_API_URL +
      customerManagerRouter.deleteMany, listIds);
  }


}
