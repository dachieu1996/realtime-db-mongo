import { environment } from './../../../environments/environment';
import { managerReaderRouter, userManagerRouter } from './../../utils/api-router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
@Injectable({
  providedIn: 'root'
})
export class UserManagerService {

  constructor(private httpClient: _HttpClient) { }

  getList(page: number, size: number, sort: string, filter: string): Observable<any> {
    return this.httpClient.get(
      environment.BASE_API_URL +
      userManagerRouter.getUsers +
      "&page=" +
      page +
      "&size=" +
      size +
      "&filter=" +
      filter +
      "&sort=" +
      sort
    );
  }
}
