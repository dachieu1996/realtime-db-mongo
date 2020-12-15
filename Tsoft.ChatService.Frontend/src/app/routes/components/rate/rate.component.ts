import { Component, Input, OnInit, Optional, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.scss']
})
export class RateComponent implements ControlValueAccessor, OnInit {

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

  constructor(
    @Optional() @Self() public ngControl: NgControl
  ) {
    this.ngControl.valueAccessor = this;
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

