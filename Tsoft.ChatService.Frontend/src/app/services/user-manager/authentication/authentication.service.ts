import { authenticationRouter } from './../../../utils/api-router';
import { environment } from '@env/environment';
import { _HttpClient } from '@delon/theme';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient: _HttpClient) { }

  login(payload) {
    return this.httpClient.post(environment.BASE_API_URL + authenticationRouter.login, payload);
  }
}
