import { AuthenticationService } from './../../../services/user-manager/authentication/authentication.service';
import { UserManagerService } from 'src/app/services/user-manager/user-manager.service';
import { AppComponentBase } from '@shared';
import { Injector } from '@angular/core';
import { SettingsService, _HttpClient } from '@delon/theme';
import { Component, OnDestroy, Inject, Optional, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { SocialService, SocialOpenType, ITokenService, DA_SERVICE_TOKEN, ITokenModel } from '@delon/auth';
import { ReuseTabService } from '@delon/abc';
import { StartupService } from '@core';
import { tap, map } from 'rxjs/operators';
import { environment } from '@env/environment';
import { UserRightService } from '../../../services';
import { PARAMETERS } from 'src/app/helpers/Parameters';

@Component({
  selector: 'passport-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  providers: [SocialService],
})
export class UserLoginComponent extends AppComponentBase implements OnDestroy, OnInit {
  constructor(
    injector: Injector,
    fb: FormBuilder,
    modalSrv: NzModalService,
    private router: Router,
    private settingsService: SettingsService,
    private socialService: SocialService,
    @Optional()
    @Inject(ReuseTabService)
    private reuseTabService: ReuseTabService,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
    private startupSrv: StartupService,
    public http: _HttpClient,
    public msg: NzMessageService,
    public userRightService: UserRightService,
    private userManagerService: UserManagerService,
    private authenticationService: AuthenticationService
  ) {
    super(injector);
    this.form = fb.group({
      userName: [null, [Validators.required, Validators.minLength(4)]],
      password: [null, Validators.required],
      mobile: [null, [Validators.required, Validators.pattern(/^1\d{10}$/)]],
      captcha: [null, [Validators.required]],
      remember: [true],
    });
    modalSrv.closeAll();
    const user = this.tokenService.get();
    if (user.token !== null && user.token !== undefined) {
      this.router.navigateByUrl('/');
    }
  }

  // #region fields

  get userName() {
    return this.form.controls.userName;
  }
  get password() {
    return this.form.controls.password;
  }
  get mobile() {
    return this.form.controls.mobile;
  }
  get captcha() {
    return this.form.controls.captcha;
  }
  form: FormGroup;
  error = '';
  type = 0;
  isLoading = false;

  // #region get captcha

  count = 0;
  interval$: any;

  ngOnInit() { }

  // #endregion

  switch(ret: any) {
    this.type = ret.index;
  }

  getCaptcha() {
    if (this.mobile.invalid) {
      this.mobile.markAsDirty({ onlySelf: true });
      this.mobile.updateValueAndValidity({ onlySelf: true });
      return;
    }
    this.count = 59;
    this.interval$ = setInterval(() => {
      this.count -= 1;
      if (this.count <= 0) {
        clearInterval(this.interval$);
      }
    }, 1000);
  }

  // #endregion

  submit() {
    // this.popupMessageService.showModal();
    // return;
    this.error = '';
    if (this.type === 0) {
      this.userName.markAsDirty();
      this.userName.updateValueAndValidity();
      this.password.markAsDirty();
      this.password.updateValueAndValidity();
      if (this.userName.invalid || this.password.invalid) {
        return;
      }
    } else {
      this.mobile.markAsDirty();
      this.mobile.updateValueAndValidity();
      this.captcha.markAsDirty();
      this.captcha.updateValueAndValidity();
      if (this.mobile.invalid || this.captcha.invalid) {
        return;
      }
    }
    this.isLoading = true;
    this.authenticationService
      .login({
        username: this.userName.value,
        password: this.password.value,
      })
      .pipe(
        tap(() => (this.isLoading = false)),
      )
      .toPromise().then(async (res: any) => {
        this.isLoading = false;
        if (!res) {
          this.error = this.translate('app.login.not-authorize');
          return;
        }

        if (res.data === null || res.data === undefined) {
          this.error = this.translate('login.authentication.' + res.message);
          return;
        }

        // Clear route reuse information
        this.reuseTabService.clear();

        // let appId = environment.APPLICATION_ID;
        // if (appId == null || appId === '') {
        //   appId = res.data.applicationId;
        // }
        // Clear rights cache and init rigths from login response
        this.userRightService.deleteAll();
        if (res.data.rights.length > 0) {
          for (const rCode of res.data.rights) {
            this.userRightService.add(rCode);
          }
        }
        // Set user token information
        this.tokenService.set({
          id: res.data.id,
          token: res.data.token,
          name: res.data.fullname,
          right: this.userRightService.getAll()
        });

        this.settingsService.setUser({
          name: res.data.fullname,
          avatar: res.data.avatarUrl,
          email: res.data.email
        });
        // await this.getHeadTitle();
        this.startupSrv.load().then(() => {
          let url = this.tokenService.referrer!.url || '/';
          if (url.includes('/passport')) {
            url = '/';
          }
          this.router.navigateByUrl(url);
        });

      });
  }

  ngOnDestroy(): void {
    if (this.interval$) {
      clearInterval(this.interval$);
    }
  }
}
