import { Injectable } from '@angular/core';
import { SettingsService, _HttpClient } from '@delon/theme';

import { environment } from '@env/environment';

import { navigationRouter } from '../../../utils';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  constructor(private http: _HttpClient) {}

  getNavigationOwner() {
    return this.http.get(environment.BASE_API_URL + navigationRouter.getNavigationOwner);
  }
}
