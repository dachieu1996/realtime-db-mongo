import { Component, Input, OnInit, Optional, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'app-input-password',
  templateUrl: './input-password.component.html',
  styleUrls: ['./input-password.component.less']
})
export class InputPasswordComponent implements ControlValueAccessor, OnInit {
  @Input('hideLabel') hideLabel = false;
  @Input('labelContent') labelContent: string;
  @Input('labelHorizontal') labelHorizontal = true;
  @Input('errorTip') errorTip: string;
  @Input('disabled') disabled = false;
  @Input('readonly') readonly = false;
  @Input('required') required = false;
  @Input('span') span = 16;
  passwordVisible = false;
  password?: string;
  constructor(@Optional() @Self() public ngControl: NgControl) {
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
