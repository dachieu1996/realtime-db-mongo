import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
// RxJS
import { Observable, from } from 'rxjs';
import { _HttpClient } from '@delon/theme';
import { nodeUploadRouter } from '../../../utils';
// import { SelectItem } from '../../models';
@Injectable({
  providedIn: 'root',
})
export class NodeService {
  constructor(private httpClient: _HttpClient) {}
  uodeUploadBlob({ file }): Observable<any> {
    const formData: any = new FormData();
    formData.append('file', file, file.name);
    return this.httpClient.post(environment.BASE_API_URL + nodeUploadRouter.nodeUploadBlob, formData);
  }
}
