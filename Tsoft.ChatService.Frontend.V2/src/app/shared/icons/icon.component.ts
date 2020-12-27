import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
