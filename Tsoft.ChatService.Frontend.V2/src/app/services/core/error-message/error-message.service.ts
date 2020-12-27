import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, Injector, Inject } from '@angular/core';
import { Observable, of } from 'rxjs';

import { NzNotificationService } from 'ng-zorro-antd';
import { I18NService } from '@core/i18n/i18n.service';
import { ALAIN_I18N_TOKEN } from '@delon/theme';

@Injectable({
  providedIn: 'root'
})
export class ErrorMessageService {

  constructor(private injector: Injector, @Inject(ALAIN_I18N_TOKEN) private i18n: I18NService) { }

  messages: string[] = [];

  private get notification(): NzNotificationService {
    return this.injector.get(NzNotificationService);
  }

  handle(ev: HttpErrorResponse) {
    switch (ev.status) {
      case 0:
        this.showMessage(`${this.i18n.fanyi('http.request.error.contact-system-admin')}`)
        break;
      default:
        if (ev.error instanceof Blob) {
          this.handleBlobResponseMessage(ev.error);
        }
        else {
          if (ev.error && ev.error.message)
            this.showMessageCode(ev.error.message);
          else
            this.showMessage(`${this.i18n.fanyi('http.request.error')} ${ev.status}: ${ev.url}`)
        }
    }
  }

  handleBlobResponseMessage(error: Blob) {
    const reader = new FileReader();
    // This fires after the blob has been read/loaded.
    reader.addEventListener('loadend', (e) => {
      const text = (e.target as FileReader).result;

      const response = JSON.parse(text as string);
      this.showMessageCode(response.message)
    });

    // Start reading the blob as text.
    reader.readAsText(error);
  }

  showMessage(content: string, title: string = `${this.i18n.fanyi('http.request.error.unknown.title')}`) {
    this.notification.error(
      title,
      content,
      {
        nzPauseOnHover: true,
        nzDuration: 10000,
      },
    );
  }

  showMessageCode(code) {
    switch (code) {
      case 'TokenExpired':
        this.showMessage(`${this.i18n.fanyi('message.error.download-link.token-expired')}`)
        break;
      case 'TokenInvalid':
        this.showMessage(`${this.i18n.fanyi('message.error.download-link.token-invalid')}`)
        break;
      case 'InvalidUser':
        this.showMessage(`${this.i18n.fanyi('message.error.download-link.invalid-user')}`)
        break;
      case 'EmailUsed':
        this.showMessage(`${this.i18n.fanyi('message.error.download-link.email-used')}`)
        break;
      case 'IdNotFound':
        this.showMessage(`${this.i18n.fanyi('message.error.download-link.id-not-found')}`)
        break;
      default:
        this.showMessage(`${this.i18n.fanyi('http.request.error')} ${code}`)
        break;
    }
  }

}
