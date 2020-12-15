import * as Utils from '../utils';
export const ParsePrice = price => {
  if (price) {
    price = price + '';
    return price.replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ',00 đ';
  }
  return '';
};
export const ParsePriceInput = price => {
  if (price || price === 0) {
    var newprice = price + '';
    newprice = newprice.replace('.', '');
    return newprice.replace(/\B(?=(\d{3})+(?!\d))/g, '.') + '';
  }
  return '';
};
export const parserPrice = price => {
  if (price) {
    var newprice = price + '';
    newprice = newprice.split('.').join('');
    return newprice;
  }
  return '';
};
export const ProductTmpTypeToString = type => {
  switch (type) {
    case 'consu':
      return 'Tiêu dùng';
    case 'service':
      return 'Dịch vụ';
    case 'product':
      return 'Sản phẩm';
  }
  return '';
};
export const UomTypeToString = (type: string) => {
  const uomType = Utils.UOM_TYPE;
  switch (type) {
    case uomType.bigger:
      return 'Lớn hơn đơn vị đo lường gốc';
    case uomType.reference:
      return 'Đơn vị gốc của nhóm này';
    case uomType.smaller:
      return 'Nhỏ hơn đơn vị gốc của nhóm này';
  }
  return '';
};
export const round = (val: number, decimal: number) => {
  return Math.round(val * Math.pow(10, decimal) + Number.EPSILON) / Math.pow(10, decimal);
};
