import { ControlValueAccessor, NgControl } from '@angular/forms';
import { Component, Input, OnInit, Self, Optional } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.less']
})
export class CheckboxComponent implements ControlValueAccessor {
  @Input('labelContent') labelContent: string;
  @Input('checkedContent') checkedContent: string;
  @Input('unCheckedContent') unCheckedContent: string;

  @Input('errorTip') errorTip: string;
  @Input('disabled') disabled: boolean = false;
  @Input('required') required: boolean = false;
  @Input('checkedColor') checkedColor: string = '#36c6d3';
  @Input('unCheckedColor') unCheckedColor: string = '#f1c40f';
  @Input('name') name: string = "checkbox";
  @Input('span') span: number = 16;
  @Input('classLabel') classLabel: string;
  @Input('hideLabel') hideLabel = false;
  @Input('labelHorizontal') labelHorizontal = true;

  constructor(
    @Optional() @Self() public ngControl: NgControl
  ) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

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
