import { Component, OnInit, Inject, Injector } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SettingsService } from '@delon/theme';
import { DA_SERVICE_TOKEN, ITokenService, SocialService } from '@delon/auth';

@Component({
  selector: 'app-callback',
  template: ``,
  providers: [SocialService],
})
export class CallbackComponent implements OnInit {
  type: string;

  constructor(
    private socialService: SocialService,
    private settingsSrv: SettingsService,
    private route: ActivatedRoute,
    private injector: Injector,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
  ) {}

  ngOnInit(): void {
    this.type = this.route.snapshot.params.type;
    const token = this.tokenService.get();
    // console.info('app-callback', token);
    if (!token.token) {
      console.log(token);
      // this.goTo('/passport/login');
    } else {
      this.goTo('/dashboard');
    }

    // this.mockModel();
  }

  private goTo(url: string) {
    setTimeout(() => this.injector.get(Router).navigateByUrl(url));
  }

  // private mockModel() {
  //   const info = {
  //     token: '123456789',
  //     name: 'cipchk',
  //     email: `${this.type}@${this.type}.com`,
  //     id: 10000,
  //     time: +new Date(),
  //   };
  //   this.settingsSrv.setUser({
  //     ...this.settingsSrv.user,
  //     ...info,
  //   });
  //   this.socialService.callback(info);
  // }
}
