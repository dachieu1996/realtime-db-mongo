import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ControlContainer } from '@angular/forms';
type Color = 'active' | 'inActive';
@Component({
  selector: 'app-on-off',
  templateUrl: './on-off.component.html',
  styleUrls: ['./on-off.component.less']
})
export class OnOffComponent implements OnInit {
  @Input('dataOnOff') dataOnOff = new OnOffModel();
  @Input() disable = false;
  @Input('type') type = "switch"; // 'switch' or 'checkbox' //
  @Input() onOffModel = false;
  @Output() onOffModelChange = new EventEmitter<boolean>();

  colorCodeOn: string;
  colorCodeOff: string;

  constructor() { }

  ngOnInit() {
    switch (this.dataOnOff.bgColorOn) {
      case 'active':
        this.colorCodeOn = '#36c6d3';
        break;
      case 'inActive':
        this.colorCodeOn = '#f1c40f';
        break;
      default:
        this.colorCodeOn = 'default';
        break;
    }

    switch (this.dataOnOff.bgColorOff) {
      case 'active':
        this.colorCodeOff = '#36c6d3';
        break;
      case 'inActive':
        this.colorCodeOff = '#f1c40f';
        break;
      default:
        this.colorCodeOff = 'default';
        break;
    }
  }


}
export class OnOffModel {
  nameOn: string | null;
  nameOff: string | null;
  bgColorOn?: Color;
  bgColorOff?: Color;
}
