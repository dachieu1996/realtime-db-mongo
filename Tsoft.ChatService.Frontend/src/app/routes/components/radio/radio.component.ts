import { Component, Input, OnInit, Optional, Self } from '@angular/core';
import { NgControl } from '@angular/forms';
interface Radio {
  label?: string,
  value: string
}
@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.less']
})
export class RadioComponent implements OnInit {

  @Input('labelContent') labelContent: string;
  @Input('checkedContent') checkedContent: string;
  @Input('unCheckedContent') unCheckedContent: string;
  @Input('noColon') noColon = false;
  @Input('errorTip') errorTip: string;
  @Input('disabled') disabled = false;
  @Input('required') required = false;
  @Input('name') name = "checkbox";
  @Input('span') span = 16;
  @Input('classLabel') classLabel: string;
  // tslint:disable-next-line:no-input-rename
  @Input('listDataRadio') listDataRadio: Radio[] = [];
  @Input('hideLabel') hideLabel = false;
  @Input('labelHorizontal') labelHorizontal = true;
  @Input('styleRadio') styleRadio = false;
  constructor(
    @Optional() @Self() public ngControl: NgControl
  ) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }
  ngOnChanges() { }

  ngOnInit() {
  }

  writeValue(obj: any): void {
  }
  registerOnChange(fn: any): void {
  }
  registerOnTouched(fn: any): void {
  }
  setDisabledState?(isDisabled: boolean): void {
  }
}
