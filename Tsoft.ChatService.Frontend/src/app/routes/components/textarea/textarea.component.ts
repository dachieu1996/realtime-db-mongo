import { Component, OnInit, Input, Optional, Self } from '@angular/core';
import { NgControl, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss']
})
export class TextareaComponent implements ControlValueAccessor, OnInit {
  @Input('labelContent') labelContent: string;
  @Input('hideLabel') hideLabel = false;
  @Input('errorTip') errorTip: string;
  @Input('disabled') disabled = false;
  @Input('required') required = false;
  @Input('span') span = 16;
  @Input('minRows') minRows = 2;
  @Input('maxRows') maxRows = 6;
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
