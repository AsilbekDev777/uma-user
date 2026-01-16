import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { toast } from 'ngx-sonner';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  protected apiUrl = environment.API_URL;
  protected useBearer = false;
  protected returnJson = true;

  constructor(
    protected http: HttpClient,
    protected router: Router,
  ) { }

  init() {
    window.localStorage.setItem('loadingCol', '0');
  }

  protected getUrl(url: String) {
    return this.apiUrl + String(url);
  }
  protected getHeader() {
    let token = localStorage.getItem('token');
    let headerObj: any = {};
    if (this.returnJson) {
      headerObj['Content-Type'] = 'application/json';
    }
    if (this.useBearer) {
      headerObj['X-Auth-Token'] = token;
    }
    return headerObj;
  }

  showMessage(
    status = false,
    title = '',
    description = '',
    list: Array<any> = []
  ) {
    toast.error(title)
  }

  protected handleError(error: any, url = '') {
    if (error.status === 401) {
      if (url === '/auth/token/init') {
        this.showMessage(
          false,
          '',
          error.error && error.error.errorMessage
            ? error.error.errorMessage
            : 'Ошибка!'
        );
      }
      this.logout();
    } else if (
      error.status === 400 ||
      error.status === 403 ||
      error.status === 404 ||
      error.status === 409 ||
      error.status === 418 ||
      error.status === 500 ||
      error.status === 503 ||
      error.status === 504
    ) {
      this.showMessage(
        false,
        '',
        error.error && error.error.errorMessage
          ? error.error.errorMessage
          : 'Ошибка!'
      );
    } else if (error.status === 0) {
      this.showMessage(false, '', error.statusText);
    }
    return;
  }

  protected postDefault(url: string, data: any, headers: any = {}) {
    const url2 = this.getUrl(url);
    let reqHeader = { ...this.getHeader(), ...headers };
    this.increaseLoadingCol();
    return this.http
      .post<any>(url2, data, {
        headers: new HttpHeaders(reqHeader),
        observe: 'response'
      })
      .toPromise()
      .then((r) => {
        this.decreaseLoadingCol();
        return r;
      })
      .catch((e) => {
        this.decreaseLoadingCol();
        this.handleError(e, url);
      });
  }
  protected post(url: string, data: any, headers: any = {}) {
    // if (this.deviceString) {
    return this.postDefault(url, data, headers);
    // } else {
    // return this.loadDevice().then(() => {
    //   return this.postDefault(url, data, headers)
    // })
    // }
  }
  protected postData(url: string, data: any, headers: any = {}) {
    return this.post(url, data, headers).then((res) => {
      return res && res.body.data ? res.body.data : res;
    });
  }

  protected getDefault(url: string, headers: any = {}) {
    const url2 = this.getUrl(url);
    let reqHeader = { ...this.getHeader(), ...headers };
    this.increaseLoadingCol();
    return this.http
      .get<any>(url2, { headers: new HttpHeaders(reqHeader) })
      .toPromise()
      .then((r) => {
        this.decreaseLoadingCol();
        return r;
      })
      .catch((e) => {
        this.decreaseLoadingCol();
        this.handleError(e);
      });
  }
  protected get(url: string, headers: any = {}) {
    return this.getDefault(url, headers);
    // } else {
    //   return this.loadDevice().then(() => {
    //     return this.getDefault(url, headers)
    //   })
    // }
  }
  protected getData(url: string, headers: any = {}) {
    return this.get(url, headers).then((res) => {
      return res && res.data ? res.data : res;
    });
  }

  protected deleteDefault(url: string, headers: any = {}) {
    const url2 = this.getUrl(url);
    let reqHeader = { ...this.getHeader(), ...headers };
    this.increaseLoadingCol();
    return this.http
      .delete<any>(url2, { headers: new HttpHeaders(reqHeader) })
      .toPromise()
      .then((r) => {
        this.decreaseLoadingCol();
        return r;
      })
      .catch((e) => {
        this.decreaseLoadingCol();
        this.handleError(e);
      });
  }

  protected delete(url: string, headers: any = {}) {
    return this.deleteDefault(url, headers);
  }

  protected deleteData(url: string, headers: any = {}) {
    return this.delete(url, headers).then((res) => {
      return res && res.data ? res.data : res;
    });
  }

  getLoadingCol(): number {
    let col = window.localStorage.getItem('loadingCol');
    let num = col ? Number.parseInt(col) : 0;
    if (Number.isNaN(num)) {
      num = 0;
    }
    return num;
  }
  increaseLoadingCol() {
    let num = this.getLoadingCol();
    num++;
  }
  decreaseLoadingCol() {
    let num = this.getLoadingCol();
    if (num > 0) {
      num--;
    }
  }

  logout() {
    let ds = this.deviceString;
    setTimeout(() => {
      sessionStorage.clear();
      this.deviceString = ds;
      this.router.navigate(['/login']).then(() => { });
    }, 10);
  }

  get deviceString(): string {
    let deviceString = window.localStorage.getItem('deviceString');
    return deviceString ? deviceString : '';
  }

  set deviceString(val) {
    window.localStorage.setItem('deviceString', val.toString());
  }
}
