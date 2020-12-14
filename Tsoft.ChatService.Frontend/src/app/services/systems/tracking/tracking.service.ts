import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';

import { environment } from '@env/environment';

import { trackingRouter } from '../../../utils';

@Injectable({
  providedIn: 'root',
})
export class TrackingService {
  constructor(private http: _HttpClient) {}

  getListTracking(page: number, size: number, sorter: string) {
    return this.http.get(
      environment.BASE_API_URL + trackingRouter.listTracking + `?page=${page}&size=${size}&sort=${sorter}`,
    );
  }
}
