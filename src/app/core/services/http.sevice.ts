import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private readonly platformId = inject(PLATFORM_ID);
  #API_URL = '';
  message = inject(NzMessageService)
  #http = inject(HttpClient);
  public get token(): string {
    return this.#authToken;
  }
  protected getHeader() {
    let token = localStorage.getItem('token');
    let headerObj: any = {};
    headerObj['Content-Type'] = 'application/json';
    headerObj['X-Auth-Token'] = token;
    return headerObj;
  }
  public get<T>(
    url: string,
    version = 1,
    headers: { [key: string]: string } = {}
  ): Observable<T> {
    this.#increaseLoadingCol();
    return this.#http
      .get<T>(this.#requestFullPath(url, version), {
        headers: new HttpHeaders({ ...this.#getHeader, ...headers })
      })
      .pipe(
        tap(() => this.#decreaseLoadingCol()),
        catchError((e: HttpErrorResponse) => {
          this.#decreaseLoadingCol();
          return this.#handleError(e);
        })
      );
  }

  public post<T, K>(
    url: string,
    body: K,
    version = 1,
    headers: { [key: string]: string } = {}
  ): Observable<T> {
    this.#increaseLoadingCol();
    return this.#http
      .post<T>(this.#requestFullPath(url, version), body, {
        headers: new HttpHeaders({ ...this.#getHeader, ...headers })
      })
      .pipe(
        tap(() => this.#decreaseLoadingCol()),
        catchError((e: HttpErrorResponse) => {
          this.#decreaseLoadingCol();
          return this.#handleError(e);
        })
      );
  }

  public delete<T, K>(
    url: string,
    body: K,
    version = 1,
    headers: { [key: string]: string } = {}
  ): Observable<T> {
    this.#increaseLoadingCol();
    return this.#http
      .delete<T>(this.#requestFullPath(url, version), {
        headers: new HttpHeaders({ ...this.#getHeader, ...headers }),
        body
      })
      .pipe(
        tap(() => this.#decreaseLoadingCol()),
        catchError((e: HttpErrorResponse) => {
          this.#decreaseLoadingCol();
          return this.#handleError(e);
        })
      );
  }

  #requestFullPath(path: string, version: number, api = ''): string {
    const url = 'v' + version + path;
    switch (api) {
      default:
        return this.#API_URL + url;
    }
  }

  get #authToken(): string {
    return localStorage.getItem('token') || '';
  }

  get #getHeader(): { [key: string]: string } {
    const token = localStorage.getItem('token');
    const headerObj: any = {};
    headerObj['Content-Type'] = 'application/json';
    if (token) {
      headerObj['X-Auth-Token'] = token;
    }
    return headerObj;
  }

  #handleError(e: HttpErrorResponse) {

    if (e?.error?.errorMessage === 'Не авторизован') {
      localStorage.removeItem("token");
      localStorage.removeItem("userdata");
      localStorage.removeItem("loadingCol");
      localStorage.removeItem("userInfo");
      sessionStorage.clear();
      window.location.reload();
    }

    const noInternetConnection =
      'Отсутствует интернет-соединение. Проверьте подключение к сети.';
    if (e.status === 0) {
      return throwError(() => new Error(noInternetConnection));
    }

    const message = e?.error?.errorMessage || 'Что-то пошло не так.';
    const againLater = 'Что-то пошло не так, попробуйте позже.';
    return throwError(() => new Error(e?.error?.errorMessage || againLater));
  }

  #getLoadingCol(): number {
    let num: number = 0;
    if (isPlatformBrowser(this.platformId)) {
      const col = localStorage.getItem('loadingCol');
      num = col ? Number.parseInt(col) : 0;
      if (Number.isNaN(num)) {
        num = 0;
      }
    }
    return num;
  }
  #increaseLoadingCol(): void {
    let num = this.#getLoadingCol();
    num++;
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('loadingCol', num.toString());
    }
  }
  #decreaseLoadingCol(): void {
    let num = this.#getLoadingCol();
    if (num > 0) {
      num--;
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('loadingCol', num.toString());
      }
    }
  }
}
