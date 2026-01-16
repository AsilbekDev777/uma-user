import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import * as Forge from 'node-forge';

@Injectable({
  providedIn: 'root'
})
export class HrService {
  constructor() { }

  encWithPubKey(valueToEncrypt: string, pubKey: string): string {
    var realPubKey =
      '-----BEGIN PUBLIC KEY-----\n' + pubKey + '\n-----END PUBLIC KEY-----';
    var rsa = Forge.pki.publicKeyFromPem(realPubKey);
    return window.btoa(rsa.encrypt(valueToEncrypt.toString()));
  }

  validationClass(val: any) {
    return {
      'is-invalid': val && val.invalid && (val.dirty || val.touched),
      'is-valid': val && val.valid && (val.dirty || val.touched)
    };
  }

  getAccBalance(val: any, del = true): string {
    var toFloat = Number.parseFloat(val);
    if (val && !isNaN(toFloat)) {
      var son = del ? toFloat / 100 : toFloat;
      return son.toFixed(2);
    }
    return '0';
  }

  getAccBalanceNum(val: any): number {
    var value = this.getAccBalance(val);
    var value2 = Number.parseFloat(value);
    return Number.isNaN(value2) ? 0 : value2;
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  getStatusColor(val: number): string {
    if (val === undefined || val === null) {
      return '';
    }
    if (val.toString() === '31') {
      return 'primary';
    } else if (val.toString() === '21') {
      return 'warn';
    } else if (val.toString() === '0') {
      return 'accent';
    }
    return '';
  }

  getABSStatusColor(val: number): string {
    if (val === undefined || val === null) {
      return '';
    }
    var val2 = String(val);
    if (val2 === '1' || val2 === '2' || val2 === '3') {
      return 'blue-text';
    } else if (
      val2 === '0' ||
      val2 === '6' ||
      val2 === '8' ||
      val2 === '9' ||
      val2 === '11' ||
      val2 === '12'
    ) {
      return 'orange-text';
    } else {
      return 'text-red-500';
    }
  }

  getStatusColorApp(val: number): string {
    if (val === undefined || val === null) {
      return '';
    }
    var val2 = String(val);
    if (val2 === '1') {
      return 'blue-text';
    } else if (val2 === '2') {
      return 'text-red-500';
    }
    return 'orange-text';
  }

  getStatusText(val: number): string {
    if (val === undefined || val === null) {
      return '';
    }
    if (val === 1) {
      return 'Введен';
    } else if (val === 2) {
      return 'Утвержден';
    } else if (val === 3) {
      return 'Закрыт';
    }
    return val.toString();
  }

  toInteger(val: any, def = 0) {
    if (!val) {
      return def;
    }
    var val2 = Number.parseInt(val);
    if (Number.isNaN(val2)) {
      return def;
    }
    return val2;
  }

  getCurrWord(val: any) {
    var val2 = val ? val.toString() : '0';
    if (val2 === '840') {
      return 'USD';
    } else if (val2 === '978') {
      return 'EUR';
    } else if (val2 === '826') {
      return 'GBP';
    } else if (val2 === '392') {
      return 'JPY';
    } else if (val2 === '756') {
      return 'CHF';
    } else if (val2 === '643') {
      return 'RUB';
    } else if (val2 === '398') {
      return 'KZT';
    } else if (val2 === '0') {
      return 'UZS';
    } else {
      return val2;
    }
  }

  getClientDataFromToken(): any {
    var token = window.localStorage.getItem('token');
    if (token) {
      var arr = token.toString().split('.');
      if (arr[1]) {
        try {
          return JSON.parse(decodeURIComponent(escape(atob(arr[1]))));
          // return {weight: 60}
        } catch (e) {
          return null;
        }
      }
    }
    return null;
  }

  reqDataWithTime(date: Date): string {
    var newDate = new Date(date);
    var year = newDate.getFullYear();
    var month =
      newDate.getMonth() + 1 > 9
        ? newDate.getMonth() + 1
        : `0${newDate.getMonth() + 1}`;
    var day =
      newDate.getDate() > 9 ? newDate.getDate() : `0${newDate.getDate()}`;
    var hours =
      newDate.getHours() > 9 ? newDate.getHours() : `0${newDate.getHours()}`;
    var minutes =
      newDate.getMinutes() > 9
        ? newDate.getMinutes()
        : `0${newDate.getMinutes()}`;
    var seconds =
      newDate.getSeconds() > 9
        ? newDate.getSeconds()
        : `0${newDate.getSeconds()}`;
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  ifAccess() {
    var userObj = this.getClientDataFromToken();
    return !!(userObj && userObj.weight !== 60);
  }

  toJson(val: any) {
    try {
      return JSON.stringify(val);
    } catch (e) {
      return val;
    }
  }

  print() {
    window.print();
  }

  dateFormat(type = 'Y-m-d', D: any = '') {
    const date = D ? new Date(D) : new Date();

    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    if (type === 'd.m.Y') {
      return `${dd}.${mm}.${yyyy}`;
    } else {
      return `${yyyy}-${mm}-${dd}`;
    }
  }

  onlyLatinPattern() {
    return '[A-Za-z0-9 s,.*?!@#$%&()\'"-_]*';
  }

  showMessage(
    status = false,
    title = '',
    description = '',
    list: Array<any> = []
  ) {

  }
}
