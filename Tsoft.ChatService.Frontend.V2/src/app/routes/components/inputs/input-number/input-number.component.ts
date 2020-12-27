import { ControlValueAccessor, NgControl } from '@angular/forms';
import { Component, Input, Self, OnInit, Optional } from '@angular/core';

@Component({
  selector: 'app-input-number',
  templateUrl: './input-number.component.html',
  styleUrls: ['./input-number.component.less'],
})
export class InputNumberComponent implements ControlValueAccessor, OnInit {
  @Input('labelContent') labelContent: string;
  @Input('hideLabel') hideLabel = false;
  @Input('min') min = 0;
  @Input('max') max: number;
  @Input('step') step = 1;
  @Input('errorTip') errorTip: string;
  @Input('disabled') disabled = false;
  @Input('required') required = false;
  @Input('span') span = 16;
  @Input('labelHorizontal') labelHorizontal = true;
  @Input('classInput') classInput = false;

  constructor(@Optional() @Self() public ngControl: NgControl) {
    this.ngControl.valueAccessor = this;
  }

  ngOnInit() {}

  writeValue(obj: any): void {}
  registerOnChange(fn: any): void {}
  registerOnTouched(fn: any): void {}
  setDisabledState?(isDisabled: boolean): void {}
}
