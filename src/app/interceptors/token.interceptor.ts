import { TokenService } from './../services/token.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor (
    private tokenService: TokenService
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const req = this.addToken(request)
    return next.handle(req);
  }
  private addToken(req: HttpRequest<unknown>) {
    const token = this.tokenService.getToken()
    if (token) {
      return req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      })
    }
    return req
  }
}
