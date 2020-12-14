import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { zip } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MenuService, SettingsService, TitleService, ALAIN_I18N_TOKEN } from '@delon/theme';
import { ACLService } from '@delon/acl';
import { TranslateService } from '@ngx-translate/core';
import { I18NService } from '../i18n/i18n.service';

import { NzIconService, NzMessageService } from 'ng-zorro-antd';
import { ICONS_AUTO } from '../../../style-icons-auto';
import { ICONS } from '../../../style-icons';

import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { UserRightService } from '../../services';

/**
 * For application startup
 * Generally used to obtain basic data required by the application, etc.
 */
@Injectable()
export class StartupService {
  constructor(
    iconSrv: NzIconService,
    private menuService: MenuService,
    private translate: TranslateService,
    @Inject(ALAIN_I18N_TOKEN) private i18n: I18NService,
    private settingService: SettingsService,
    private aclService: ACLService,
    private titleService: TitleService,
    private httpClient: HttpClient,
    private userRightService: UserRightService,
    private msg: NzMessageService,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
  ) {
    iconSrv.addIcon(...ICONS_AUTO, ...ICONS);
  }

  load(): Promise<any> {
    // only works with promises
    // https://github.com/angular/angular/issues/15088
    return new Promise(resolve => {
      zip(
        this.httpClient.get(`assets/tmp/i18n/${this.i18n.defaultLang}.json`),
        this.httpClient.get('assets/tmp/app-data.json'),
      )
        .pipe(
          // Exception message after receiving other interceptors
          catchError(([langData, appData]) => {
            resolve(null);
            return [langData, appData];
          }),
        )
        .subscribe(
          ([langData, appData]) => {
            // setting language data
            this.translate.setTranslation(this.i18n.defaultLang, langData);
            this.translate.setDefaultLang(this.i18n.defaultLang);
            // console.log(appData);
            // application data
            const res: any = appData;
            // Application information: including site name, description, year
            this.settingService.setApp(res.app);
            // User information: including name, picture, email address
            // this.settingService.setUser(res.user);
            // ACL: set permissions to full
            this.aclService.setFull(true);
            // Initialization menu
            this.menuService.add(res.menu);
            // Set page title suffix
            this.titleService.default = '';
            this.titleService.suffix = res.app.name;
          },
          () => { },
          () => {
            resolve(null);
          },
        );
      const token = this.tokenService.get();
      if (token.right && this.userRightService.getAll().length === 0) {
        this.userRightService.deleteAll();
        for (const iterator of token.right) {
          this.userRightService.add(iterator);
        }
      }
    });
  }
}
