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
  createUser(data: any): Observable<any> {
    return this.httpClient.post(environment.BASE_API_URL + userManagerRouter.create, data);
  }
  getUserById(id: any): Observable<any> {
    return this.httpClient.get(environment.BASE_API_URL + userManagerRouter.getUserById + '/' + id);
  }
  uploadAFile(File: any): Observable<any> {
    const frmData = new FormData();
    frmData.append("files", File);
    return this.httpClient.post(environment.BASE_API_URL + userManagerRouter.uploadFile, frmData);
  }
  updateUser(id: string, data: any): Observable<any> {
    return this.httpClient.put(
      environment.BASE_API_URL + userManagerRouter.updateUser + '/' + id,
      data,
    );
  }
  changePassword(id: string, data: any): Observable<any> {
    return this.httpClient.put(
      environment.BASE_API_URL + userManagerRouter.changePassword + '?id=' + id,
      data,
    );
  }
}
