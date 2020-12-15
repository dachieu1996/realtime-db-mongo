import { ControlValueAccessor, NgControl } from '@angular/forms';
import { Component, Input, Self, OnInit, Optional } from '@angular/core';

@Component({
  selector: 'app-input-textarea',
  templateUrl: './input-textarea.component.html',
  styleUrls: ['./input-textarea.component.scss']
})
export class InputTextareaComponent implements ControlValueAccessor, OnInit {
  @Input('hideLabel') hideLabel = false;
  @Input('labelContent') labelContent: string;
  @Input('errorTip') errorTip: string;
  @Input('disabled') disabled = false;
  @Input('required') required = false;
  @Input('span') span = 16;
  @Input('labelHorizontal') labelHorizontal = true;
  @Input('minRows') minRows = 2;
  @Input('maxRows') maxRows = 6;

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
