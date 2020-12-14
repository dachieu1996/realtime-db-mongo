import { ControlValueAccessor, NgControl } from '@angular/forms';
import { Component, Input, OnInit, Self, Optional, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.less']
})
export class SwitchComponent implements ControlValueAccessor {
  @Output() change = new EventEmitter();
  @Input('labelContent') labelContent: string;
  @Input('offContent') offContent: string;
  @Input('onContent') onContent: string;
  @Input('errorTip') errorTip: string;
  @Input('disabled') disabled: boolean = false;
  @Input('required') required: boolean = false;
  @Input('name') name: string = "switch";
  @Input('span') span: number = 16;

  constructor(
    @Optional() @Self() public ngControl: NgControl
  ) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
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
