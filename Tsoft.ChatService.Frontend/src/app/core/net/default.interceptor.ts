import { ErrorMessageService } from './../../services/core/error-message/error-message.service';
import { Injectable, Injector, Inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse,
  HttpEvent,
  HttpResponseBase,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { mergeMap, catchError, finalize, retry } from 'rxjs/operators';
import { NzMessageService, NzNotificationService } from 'ng-zorro-antd';
import { _HttpClient, ALAIN_I18N_TOKEN, SettingsService } from '@delon/theme';
import { environment } from '@env/environment';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { I18NService } from '@core/i18n/i18n.service';
import { MessageService } from '../../services';

const CODEMESSAGE = {
  200: 'Máy chủ trả về thành công dữ liệu được yêu cầu.',
  201: 'Dữ liệu mới hoặc sửa đổi đã thành công.',
  202: 'Một yêu cầu đã được xếp hàng trong nền (tác vụ không đồng bộ).',
  204: 'Xóa dữ liệu thành công.',
  400: '400 - Yêu cầu được gửi có lỗi và máy chủ không tạo hoặc sửa đổi dữ liệu.',
  401: '401 - Người dùng không có quyền (mã thông báo, tên người dùng, mật khẩu không chính xác).',
  403: '403 - Người dùng được ủy quyền, nhưng truy cập bị cấm. ',
  404: '404 - Yêu cầu được tạo cho một bản ghi không tồn tại và máy chủ không làm gì cả. ',
  406: '406 - Định dạng được yêu cầu không có sẵn.',
  410: '410 - Tài nguyên được yêu cầu đã bị xóa vĩnh viễn và sẽ không còn nữa.',
  422: '422 - Khi tạo một đối tượng, đã xảy ra lỗi xác thực.',
  500: '500 - Xảy ra lỗi máy chủ. Vui lòng kiểm tra máy chủ.',
  502: '502 - Lỗi cổng.',
  503: '503 - Dịch vụ không khả dụng, máy chủ tạm thời bị quá tải hoặc bảo trì.',
  504: '504 - Cổng đã hết thời gian.',
};

export const RESPONSE_STATUS_CODES = {
  200: 200,
};

/**
 * 默认HTTP拦截器，其注册细节见 `app.module.ts`
 */
@Injectable()
export class DefaultInterceptor implements HttpInterceptor {
  constructor(
    private injector: Injector,
    private settingsService: SettingsService,
    public messageService: MessageService,
    public errorMessageService: ErrorMessageService,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
    @Inject(ALAIN_I18N_TOKEN) private i18n: I18NService,
  ) { }

  private get notification(): NzNotificationService {
    return this.injector.get(NzNotificationService);
  }

  private goTo(url: string) {
    setTimeout(() => this.injector.get(Router).navigateByUrl(url));
  }

  private checkStatus(ev: HttpResponseBase) {
    if (ev.status >= 200 && ev.status < 300) {
      return;
    }

    if (ev.status === 401) {
      this.messageService.add(`${this.i18n.fanyi('http.status.code.401')}`);
      // this.notification.error(`${this.i18n.fanyi('http.status.code.401')}`, ``);
      return;
    }
  }

  private handleData(ev: HttpResponseBase): Observable<any> {
    // 可能会因为 `throw` 导出无法执行 `_HttpClient` 的 `end()` 操作
    // It may not be able to perform the end () operation of _HttpClient because of the throw export
    if (ev.status > 0) {
      this.injector.get(_HttpClient).end();
    }
    this.checkStatus(ev);
    // Business processing: some common operations
    switch (ev.status) {
      case 401:
        // Clear token information
        (this.injector.get(DA_SERVICE_TOKEN) as ITokenService).clear();
        this.settingsService.setUser({});
        this.goTo('/passport/login');
        break;
      default:
        if (ev instanceof HttpErrorResponse) {
          this.errorMessageService.handle(ev);
        }
        break;
    }
    return of(ev);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Uniformly add server-side prefix
    let url = req.url;
    if (!url.startsWith('https://') && !url.startsWith('http://')) {
      url = environment.SERVER_URL + url;
    }
    let newReq = req.clone({ url });
    if (this.tokenService.get().token) {
      newReq = newReq.clone({
        headers: newReq.headers
          .set('Authorization', 'Bearer ' + this.tokenService.get().token)
      });
    }

    return next.handle(newReq).pipe(
      mergeMap((event: any) => {
        // Allows unified request error handling
        if (event instanceof HttpResponseBase) return this.handleData(event);
        // If everything is normal, follow up
        return of(event);
      }),
      catchError((err: HttpErrorResponse) => this.handleData(err)),
      finalize(() => { }),
    );
  }
}
