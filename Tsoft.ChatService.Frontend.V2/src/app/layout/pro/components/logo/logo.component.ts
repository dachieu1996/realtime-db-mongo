import { PARAMETERS } from './../../../../helpers/Parameters';
import { UserManagerService } from 'src/app/services/user-manager/user-manager.service';
import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { SettingsService } from '@delon/theme';
import { environment } from '@env/environment';

@Component({
  selector: 'layout-pro-logo',
  templateUrl: './logo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutProLogoComponent {
  headLogoUrl: string;
  tenantName: string;

  constructor(
    private settingsService: SettingsService,
    private userManagerService: UserManagerService,
    private ref: ChangeDetectorRef,
  ) {
    this.getTenant();
    if (settingsService.user.logo)
      this.headLogoUrl = settingsService.user.logo
    else this.headLogoUrl = '../../../../../assets/logo/logo.png';
  }

  getTenant() {
    this.tenantName = 'CRM';
  }

  get version() {
    return environment.APP_VERSION;
  }
}
