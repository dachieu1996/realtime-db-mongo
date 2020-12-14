import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button-search',
  templateUrl: './button-search.component.html',
  styleUrls: ['./button-search.component.less']
})
export class ButtonSearchComponent implements OnInit {
  @Input('text') text = 'layout.btn.search';
  @Input('buttonType') buttonType = "primary";
  @Input('iconType') iconType = "search";
  @Input('iconTheme') iconTheme = "outline";
  @Input('iconSpin') iconSpin = false;
  @Input('iconFont') iconFont: string = null;
  @Input('iconRotate') iconRotate: number = null;
  @Output('onClick') onClick = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

}
