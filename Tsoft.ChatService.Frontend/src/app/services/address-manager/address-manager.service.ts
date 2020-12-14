import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { addressManagerRouter } from 'src/app/utils';

@Injectable({
  providedIn: 'root'
})
export class AddressManagerService {

  constructor(private httpClient: _HttpClient) { }

  getListAddress(): Observable<any> {
    return this.httpClient.get(
      environment.BASE_API_URL +
      addressManagerRouter.getListAddress
    );
  }

}
