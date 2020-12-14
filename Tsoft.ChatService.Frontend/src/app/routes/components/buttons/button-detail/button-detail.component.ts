import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button-detail',
  templateUrl: './button-detail.component.html',
  styleUrls: ['./button-detail.component.less']
})
export class ButtonDetailComponent implements OnInit {
  @Input('text') text = '';
  @Input('buttonType') buttonType = "primary";
  @Input('iconType') iconType = "info";
  @Input('iconTheme') iconTheme = "outline";
  @Input('iconSpin') iconSpin = false;
  @Input('iconFont') iconFont: string = null;
  @Input('iconRotate') iconRotate: number = null;
  @Output('onClick') onClick = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  openDetail() {
    this.onClick.emit();
  }
}
