import { Injectable, Injector, Inject } from '@angular/core';
import { Observable, of } from 'rxjs';

import { NzNotificationService } from 'ng-zorro-antd';
import { I18NService } from '@core/i18n/i18n.service';
import { ALAIN_I18N_TOKEN } from '@delon/theme';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(private injector: Injector, @Inject(ALAIN_I18N_TOKEN) private i18n: I18NService) { }

  messages: string[] = [];

  private get notification(): NzNotificationService {
    return this.injector.get(NzNotificationService);
  }

  add(content: string, title: string = "http.request.error") {
    this.showMessage(content, title)
    setTimeout(() => {
      this.clear();
    }, 10100);
  }

  clear() {
    this.messages = [];
  }

  showMessage(content: string, title: string = "http.request.error") {
    // const mess = 'Chưa đăng nhập hoặc phiên đăng nhập hết hạn';
    // const context = 'Vui lòng đăng nhập để sử dụng dịch vụ.';
    // this.notification.error(`${this.i18n.fanyi('http.request.error')} Lỗi 123`, 'errortext', {
    //   nzPauseOnHover: true,
    // });
    this.notification.error(
      `${this.i18n.fanyi(title)}`,
      `${this.i18n.fanyi(content)}`,
      {
        nzPauseOnHover: true,
        nzDuration: 10000,
      },
    );
  }
}
