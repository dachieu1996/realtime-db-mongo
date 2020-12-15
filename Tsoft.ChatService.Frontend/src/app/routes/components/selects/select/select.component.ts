import { ControlValueAccessor, NgControl } from '@angular/forms';
import { Component, Input, OnInit, Self, Output, EventEmitter, Optional } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.less']
})

export class SelectComponent implements ControlValueAccessor, OnInit {
  @Input('data') data: any[];
  @Input('labelContent') labelContent: string;
  @Input('getObjectValue') getObjectValue: boolean = false;
  @Input('errorTip') errorTip: string;
  @Input('placeHolder') placeHolder: string;
  @Input('disabled') disabled: boolean = false;
  @Input('required') required: boolean = false;
  @Input('valueField') valueField: string = "value";
  @Input('labelField') labelField: string = "label";
  @Input('openSearchModal') openSearchModal: boolean = true;
  @Input('name') name: string = "select";
  @Input('span') span: number = 16;
  @Input('labelHorizontal') labelHorizontal: boolean = true;
  @Input('hideLabel') hideLabel: boolean = false;
  @Output('onClickOpenSearch') onClickOpenSearch = new EventEmitter();
  @Output('onSearch') onSearch = new EventEmitter<string>();
  @Output('onSelectChange') onSelectChange = new EventEmitter<any>();
  @Input('mode') mode = "default";

  spanLabel = 24 - this.span;
  value: any;

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

  handleSearch(value) {
    this.onSearch.emit(value);
  }

  handleOpenSearch() {
    this.onClickOpenSearch.emit();
  }

  handleSelectChange() {
    setTimeout(() => {
      if (Array.isArray(this.data) && this.data.length > 0) {
        if (this.getObjectValue && this.mode == 'default') {
          let result = this.data.find(x => x[this.valueField] == this.value);
          this.onSelectChange.emit(result);
        } else if (this.getObjectValue && this.mode == 'multiple') {
          if (Array.isArray(this.value) && this.value.length > 0) {
            const arrValue: any[] = [];
            this.value.forEach(data => {
              arrValue.push(this.data.find(x => x[this.valueField] == data));
            });
            this.onSelectChange.emit(arrValue);
          }
        }
        else {
          this.onSelectChange.emit(this.value);
        }

      }
    }, 300);
  }
}
