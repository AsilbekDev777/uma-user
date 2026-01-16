import { HttpClient } from '@angular/common/http';
import { Inject, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from './main.service';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import {HttpService} from './http.sevice';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends MainService {
  constructor(
    override http: HttpClient,
    override router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    super(http, router);
  }
  #http = inject(HttpService);
  tokenPrepare() {
    // this.urlStep = 1
    return this.getData('/auth/token/prepare');
  }

  tokenConfirm(data: any) {
    return this.postData('/auth/token/confirm', data);
  }
  registerInit(data: any) {
    return this.postData('/auth/register/init', data);
  }

  verifyRegister(data: any) {
    return this.postData('/auth/register/verify', data);
  }

  registerVerify(data: any) {
    return this.postData('/auth/register/sign', data);
  }
  registerPhone(data: any) {
    return this.postData('/auth/register/phone', data);
  }
  tokenInit(data: any) {
    return this.postDefault('/auth/token/init', data);
  }

  passCheck(data: any) {
    return this.postData('user/v1/password/check', data);
  }

  passVerify(data: any) {
    return this.postData('user/v1/password/verify', data);
  }

  passForgot(data: any) {
    return this.postData('user/v1/password/forgot', data);
  }

  registerCheck(data: any) {
    return this.postData('user/v1/register/check', data);
  }

  register(data: any) {
    return this.postData('user/v1/register', data);
  }
  getUserInfo(): Observable<any> {
    return this.#http.get('/admin/user/me');
  }
  getUserOne(uuid: string): Observable<any> {
    return this.#http.post('/user/get/one', { uuid });
  }
  set userName(value: string) {
    localStorage.setItem('username', value);
  }

  set merchantName(value: string) {
    localStorage.setItem('merchantName', value);
  }

  set roleName(value: string) {
    localStorage.setItem('roleName', value);
  }

  set userId(value: string) {
    localStorage.setItem('userId', value);
  }

  set name(value: string) {
    localStorage.setItem('name', value);
  }
  set lastname(value: string) {
    localStorage.setItem('lastname', value);
  }

  set userData(value: string) {
    localStorage.setItem('userdata', value);
  }

  set clientThumb(value: string) {
    localStorage.setItem('clientThumb', value);
  }

  set clientFio(val: string) {
    localStorage.setItem('clientFIO', val);
  }

  set bList(val: any) {
    let list = val && val.length > 0 ? JSON.stringify(val) : '';
    localStorage.setItem('bList', list);
  }

  set refreshToken(val: any) {
    localStorage.setItem('refToken', val);
  }

  get refreshToken() {
    return localStorage.getItem('refToken');
  }

  get isAuthToken(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem("token");
    }
    return false;
  }

  get token(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem("token");
    }
    return null;
  }

  logoutInClient(): void {
    localStorage.removeItem("token");
    localStorage.removeItem("userdata");
    localStorage.removeItem("loadingCol");
    localStorage.removeItem("userInfo");
    this.router.navigate(['/login']).then();
  }

}
