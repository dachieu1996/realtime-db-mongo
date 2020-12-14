import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button-delete',
  templateUrl: './button-delete.component.html',
  styleUrls: ['./button-delete.component.less']
})
export class ButtonDeleteComponent implements OnInit {
  @Input('text') text: string = null;
  @Input('isDisabled') isDisabled: boolean = false;
  @Input('buttonClass') buttonClass: string = null;
  @Input('buttonType') buttonType: string = "danger";
  @Input('buttonShape') buttonShape: string = null;
  @Input('popConfirm') popConfirm: boolean = true;
  @Input('confirmOkI18n') confirmOkI18n: string = "layout.confirm.delete-record.confirm.delete";
  @Input('confirmCancelI18n') confirmCancelI18n: string = "layout.confirm.delete-record.confirm.cancel";
  @Input('confirmTitleI18n') confirmTitleI18n: string = "layout.confirm.delete-record";
  @Input('iconClass') iconClass: string = null;
  @Input('iconType') iconType: string = "delete";
  @Input('iconTheme') iconTheme: string = "outline";
  @Input('iconSpin') iconSpin: boolean = false;
  @Input('iconFont') iconFont: string = null;
  @Input('nzRotate') iconRotate: number = null;

  @Output('onClick') onClick = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onDelete() {
    this.onClick.emit();
  }

}
