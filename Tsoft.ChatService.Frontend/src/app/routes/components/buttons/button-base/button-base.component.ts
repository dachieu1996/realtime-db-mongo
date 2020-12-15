import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button-base',
  templateUrl: './button-base.component.html',
  styleUrls: ['./button-base.component.less']
})
export class ButtonBaseComponent implements OnInit {

  @Input('text') text: string;
  @Input('buttonType') buttonType = "primary";
  @Input('buttonClass') buttonClass: string = null;
  @Input('iconType') iconType = "question";
  @Input('iconTheme') iconTheme = "outline";
  @Input('disabled') disabled = false;
  @Input('buttonShape') buttonShape: string = null;
  @Input('iconClass') iconClass: string = null;
  @Input('iconSpin') iconSpin = false;
  @Input('iconFont') iconFont: string = null;
  @Input('iconRotate') iconRotate: number = null;
  @Output('onClick') onClick = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  handleClick() {
    this.onClick.emit();
  }

}
