import { Component, ChangeDetectionStrategy } from '@angular/core';
import { SettingsService } from '@delon/theme';

@Component({
  selector: 'layout-pro-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutProFooterComponent {
  get year() {
    const date = new Date();
    return date.getFullYear();
  }

  constructor(private setting: SettingsService) {}
}
