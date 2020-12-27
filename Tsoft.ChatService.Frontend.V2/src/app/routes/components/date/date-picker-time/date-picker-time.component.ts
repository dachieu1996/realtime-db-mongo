import { formatDate } from '@angular/common';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { Component, Input, Self, Optional, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-date-picker-time',
  templateUrl: './date-picker-time.component.html',
  styleUrls: ['./date-picker-time.component.less']
})
export class DatePickerTimeComponent implements ControlValueAccessor {
  @Input('labelContent') labelContent: string;
  @Input('errorTip') errorTip: string;
  @Input('disabled') disabled: boolean = false;
  @Input('required') required: boolean = false;
  @Input('name') name: string = "birthdate";
  @Input('span') span: number = 16;
  @Input('format') format: string = "DD/MM/YYYY HH:mm";
  @Input('hideLabel') hideLabel: boolean = false;
  @Input('labelHorizontal') labelHorizontal: boolean = true;
  @Output('onChange') onChange: EventEmitter<Date> = new EventEmitter<Date>();

  dateTime: string;

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
    if (obj && obj != "Invalid Date") {
      this.dateTime = formatDate(obj, "yyyy-MM-ddThh:mm", 'en_US');
    }
  }
  registerOnChange(fn: any): void {
  }
  registerOnTouched(fn: any): void {
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onChangeDate(event) {
    let value = new Date(event.target.value);
    if (value.toString() == "Invalid Date") {
      this.ngControl.control.setValue(new Date());
    }
    else {
      this.ngControl.control.setValue(new Date(event.target.value));
    }
    this.onChange.emit(new Date(event.target.value));
  }
}
