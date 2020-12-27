import { environment } from '@env/environment';
import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { SettingsService } from '@delon/theme';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';

@Component({
  selector: 'layout-pro-user',
  templateUrl: 'user.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutProWidgetUserComponent implements OnInit {
  constructor(
    public settings: SettingsService,
    private router: Router,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
    private settingsService: SettingsService,
  ) { }

  ngOnInit(): void {
    // mock
    // const token = this.tokenService.get() || {
    //   token: 'nothing',
    //   name: 'Admin',
    //   avatar: './assets/logo-color.svg',
    //   email: 'cipchk@qq.com',
    // };
    // this.tokenService.set(token);
    // console.log(this.settings);
  }

  logout() {
    this.tokenService.clear();
    this.settingsService.setUser({});
    this.router.navigateByUrl(this.tokenService.login_url);
  }

  get avatar() {
    return environment.BASE_API_URL + this.settings.user.avatar;
  }
}
