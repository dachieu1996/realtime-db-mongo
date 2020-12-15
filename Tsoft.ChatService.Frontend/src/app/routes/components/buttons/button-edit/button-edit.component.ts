import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button-edit',
  templateUrl: './button-edit.component.html',
  styleUrls: ['./button-edit.component.less']
})
export class ButtonEditComponent implements OnInit {
  @Input('text') text: string = null;
  @Input('isDisabled') isDisabled: boolean = false;
  @Input('buttonClass') buttonClass: string = null;
  @Input('buttonShape') buttonShape: string = null;
  @Input('buttonType') buttonType: string = "primary";
  @Input('iconClass') iconClass: string = null;
  @Input('iconType') iconType: string = "edit";
  @Input('iconTheme') iconTheme: string = "outline";
  @Input('iconSpin') iconSpin: boolean = false;
  @Input('iconFont') iconFont: string = null;
  @Input('nzRotate') iconRotate: number = null;
  @Output('onClick') onClick = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  openEdit() {
    this.onClick.emit();
  }
}
