import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button-reload',
  templateUrl: './button-reload.component.html',
  styleUrls: ['./button-reload.component.less']
})
export class ButtonReloadComponent implements OnInit {
  @Input('text') text: string = null;
  @Input('buttonType') buttonType: string = null;
  @Input('iconType') iconType: string = "reload";
  @Input('iconTheme') iconTheme: string = "outline";
  @Input('iconSpin') iconSpin: boolean = false;
  @Input('iconFont') iconFont: string = null;
  @Input('nzRotate') iconRotate: number = null;
  @Output('onClick') onClick = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  reloadList() {
    this.onClick.emit();
  }
}
