import { TransformService } from './../../../../services/transform/transform.service';
import { NgControl } from '@angular/forms';
import { Component, Input, OnInit, Optional, Self } from '@angular/core';

@Component({
  selector: 'app-input-price',
  templateUrl: './input-price.component.html',
  styleUrls: ['./input-price.component.less']
})
export class InputPriceComponent implements OnInit {

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
    @Optional() @Self() public ngControl: NgControl,
    private transformService: TransformService
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

  formatterPrice = (value: number) => `${this.transformService.formatterPriceNum(value)}`;
  parserPrice = (value: string) => this.transformService.parserPrice(value);

}
