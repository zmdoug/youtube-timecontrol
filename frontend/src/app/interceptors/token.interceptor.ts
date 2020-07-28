import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpInterceptor, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from '../services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(public auth: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const headers = request.headers.set('Authorization', ((this.auth.getToken()) ? 'Bearer ' + this.auth.getToken() : ''));
    const requestClone = request.clone({
      headers,
    });
    return next.handle(requestClone).pipe(
      tap((event: any) => {
        if (event instanceof HttpResponse) {
          const elapsed = Date.now();
        }
      }));
  }
}
