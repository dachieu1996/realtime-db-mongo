import { Injectable } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class TransformService {
  decimalPipe = new DecimalPipe('vi-VN');
  constructor() {}

  //#region Price
  formatterPrice(num: number, symbol?: string, locale?: string) {
    if (locale) this.decimalPipe = new DecimalPipe(locale);
    let result = num + '';
    result = this.decimalPipe.transform(num);
    return result + ' ' + symbol;
  }
  formatterPriceNum(num: number) {
    if (!num) num = 0;
    const symbol = '';
    return this.formatterPrice(num, symbol);
  }
  formatterPriceStr(value: string) {
    let num = 0;
    if (!isNaN(Number(value))) num = Number(value);
    const symbol = '';
    return this.formatterPrice(num, symbol);
  }
  parserPrice(value: string) {
    let numberValue = 0;
    if (!isNaN(Number(value))) {
      numberValue = Number(value);
    }
    return numberValue;
  }
  //#endregion

  //#region Quantity
  formatterQuantity(num: number, locale?: string) {
    if (!num) num = 0;
    if (locale) this.decimalPipe = new DecimalPipe(locale);
    let result = num + '';
    result = this.decimalPipe.transform(num);
    return result;
  }
  parserQuantity(value: string) {
    let numberValue = 0;
    if (!isNaN(Number(value))) {
      numberValue = Number(value);
    }
    return numberValue;
  }
  //#endregion
}
