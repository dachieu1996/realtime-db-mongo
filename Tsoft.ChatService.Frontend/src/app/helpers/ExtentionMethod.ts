import { FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';
export const GroupArray = function (values, groupBy, key) {
  if (groupBy != null) {
    let list = [];
    values.forEach(element => {
      let index = list.findIndex(l => l[groupBy] === element[groupBy]);
      if (index > -1) {
        list[index][key].push(element);
      } else {
        list.push({
          ...element,
          [key]: [{ ...element }]
        });
      }
    });
    return list;
  } else {
    return values;
  }
}
export const GroupBy = function (xs, key) {
  return xs.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};
export const IsEquivalent = function (a: any[], b: any[], props: string[]): boolean {
  let val = true;
  if (a.length !== b.length) {
    val = false;
  } else {
    for (let i = 0; i < a.length; i++) {
      for (let j = 0; j < props.length; j++) {
        let propName = props[j];
        if (Array.isArray(a[i][propName])) {
          if (a[i][propName].length !== b[i][propName].length) {
            val = false;
            break;
          } else {
            for (let k = 0; k < a[i][propName].length; k++) {
              if (b[i][propName].findIndex(f => f === a[i][propName][k]) === -1) {
                val = false;
                break;
              }
            }
          }
        }
      }
    }
  }
  return val;
}
export const NoSpace = function (control: FormControl) {
  const isWhitespace = (control.value || '').trim().length === 0;
  const isValid = !isWhitespace;
  return isValid ? null : { 'whitespace': true }
}

export const IsExist = function (control: FormControl) {
  return { 'isExist': true }
}
export const formatPhoneNumber = function (phone) {
  if (!phone)
    return;
  const setPhone = [];
  phone = phone.replace(/\s/g, '');
  setPhone.push(phone.substring(0, 3));
  setPhone.push(phone.substring(3, 6));
  setPhone.push(phone.substring(6));
  phone = setPhone.join(' ');
  return phone;
}
