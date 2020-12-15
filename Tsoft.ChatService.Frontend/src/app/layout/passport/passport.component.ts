import { Component } from '@angular/core';
import { SettingsService } from '@delon/theme';
@Component({
  selector: 'layout-passport',
  templateUrl: './passport.component.html',
  styleUrls: ['./passport.component.less'],
})
export class LayoutPassportComponent {
  get year() {
    return this.setting.app.year;
  }

  constructor(private setting: SettingsService) { }

  links = [];
}
