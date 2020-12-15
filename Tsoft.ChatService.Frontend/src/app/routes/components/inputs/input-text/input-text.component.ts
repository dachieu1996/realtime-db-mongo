import { ControlValueAccessor, NgControl } from '@angular/forms';
import { Component, Input, Self, OnInit, Optional } from '@angular/core';

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.less']
})
export class InputTextComponent implements ControlValueAccessor, OnInit {
  @Input('hideLabel') hideLabel = false;
  @Input('labelContent') labelContent: string;
  @Input('labelHorizontal') labelHorizontal = true;
  @Input('errorTip') errorTip: string;
  @Input('disabled') disabled = false;
  @Input('readonly') readonly = false;
  @Input('required') required = false;
  @Input('span') span = 16;
  @Input('placeHolder') placeHolder = '';

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
