import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-button-back',
  templateUrl: './button-back.component.html',
  styleUrls: ['./button-back.component.less']
})
export class ButtonBackComponent implements OnInit {
  @Input('text') text: string = null;
  @Output('onClick') onClick = new EventEmitter();
  @Input('buttonType') buttonType: string = "default";
  @Input('iconType') iconType: string = "rollback";
  @Input('iconTheme') iconTheme: string = "outline";
  @Input('iconFont') iconFont: string = null;
  @Input('iconSpin') iconSpin: boolean = false;
  constructor() { }

  ngOnInit() {
  }

  onClickBack() {
    this.onClick.emit();
  }

}
