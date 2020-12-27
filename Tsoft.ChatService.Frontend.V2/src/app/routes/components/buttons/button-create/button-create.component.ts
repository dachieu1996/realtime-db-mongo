import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button-create',
  templateUrl: './button-create.component.html',
  styleUrls: ['./button-create.component.less']
})
export class ButtonCreateComponent implements OnInit {
  @Input('text') text: string = null;
  @Input('buttonType') buttonType: string = "primary";
  @Input('iconType') iconType: string = "plus";
  @Input('iconTheme') iconTheme: string = "outline";
  @Input('iconSpin') iconSpin: boolean = false;
  @Input('iconFont') iconFont: string = null;
  @Input('iconRotate') iconRotate: number = null;
  @Output('onClick') onClick = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  openCreate() {
    this.onClick.emit();
  }
}
