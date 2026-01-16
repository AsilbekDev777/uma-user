import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { tap } from "rxjs/operators";
import { Router } from "@angular/router";
import { NzModalService } from "ng-zorro-antd/modal";
import { AuthService } from '../services/auth.service';
import { toast } from 'ngx-sonner';

@Injectable()
export class RequestHandlerInterceptor implements HttpInterceptor {
  constructor(private readonly router: Router,
    private readonly authService: AuthService,
    private readonly modalService: NzModalService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap({
        error: (errorResponse: HttpErrorResponse) => {
          if (errorResponse.status === 504) {
            toast.error("Ошибка на сервере")
          }
          if (errorResponse.status === 401) {
            this.modalService.closeAll();
            return this.authService.logoutInClient();
          }
          if (errorResponse.status === 403) {
            this.modalService.closeAll();
            return this.router.navigate(['403']).then();
          }
        },
      }),
      finalize(() => null)
    );
  }
}
