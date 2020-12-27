import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button-prev',
  templateUrl: './button-prev.component.html',
  styleUrls: ['./button-prev.component.less']
})
export class ButtonPrevComponent implements OnInit {

  @Input('text') text: string = null;
  @Input('isDisabled') isDisabled: boolean = false;
  @Output('onClick') onClick = new EventEmitter();
  @Input('buttonType') buttonType = "default";
  @Input('iconType') iconType = "arrow-left";
  @Input('iconTheme') iconTheme = "outline";
  @Input('iconFont') iconFont: string = null;
  @Input('iconSpin') iconSpin = false;
  @Input('disabled') disabled = false;
  constructor() { }

  ngOnInit() {
  }

  onClickBack() {
    this.onClick.emit();
  }

}
