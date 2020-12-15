import { fileManagerRouter } from './../../utils/api-router';
import { environment } from '@env/environment';
import { _HttpClient } from '@delon/theme';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileManagerService {

  constructor(private httpClient: _HttpClient) { }

  uploadFile(file) {
    const frmData = new FormData();
    frmData.append('fileupload', file);

    return this.httpClient.post(environment.BASE_API_URL + fileManagerRouter.uploadFile, frmData);
  }
}
