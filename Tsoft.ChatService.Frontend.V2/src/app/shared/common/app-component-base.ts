import { Injector } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

export abstract class AppComponentBase {
  public translateService: TranslateService;
  constructor(injector: Injector) {
    this.translateService = injector.get(TranslateService);
    const language = localStorage.getItem('languageCode');
    this.translateService.use(language && language.match(/en-US|vi-VN/) ? language : 'vi-VN');
  }
  public display: boolean = false;

  translate(key: string, ...args: any[]): string {
    return this.translateService.instant(key);
  }

  getApplicationId() {
    const token = JSON.parse(localStorage.getItem('_token'));
    if (token !== null) {
      const appId = token.appId;
      return appId;
    } else {
      return;
    }
  }

  getUserId() {
    const token = JSON.parse(localStorage.getItem('_token'));
    if (token !== null) {
      const userId = token.id;
      return userId;
    } else {
      return;
    }
  }

}

