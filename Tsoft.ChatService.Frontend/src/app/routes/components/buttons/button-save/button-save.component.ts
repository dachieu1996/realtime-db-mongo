import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button-save',
  templateUrl: './button-save.component.html',
  styleUrls: ['./button-save.component.less']
})
export class ButtonSaveComponent implements OnInit {

  @Input('text') text: string = null;
  @Input('loading') loading: boolean = false;
  @Input('buttonType') buttonType = "primary";
  @Input('iconType') iconType = "save";
  @Input('iconTheme') iconTheme = "outline";
  @Input('disabled') disabled = false;
  @Input('iconSpin') iconSpin = false;
  @Input('iconFont') iconFont: string = null;
  @Input('iconRotate') iconRotate: number = null;
  @Output('onClick') onClick = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  save() {
    this.onClick.emit();
  }

}
