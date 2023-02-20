import { TokenService } from './../services/token.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpContext,
  HttpContextToken
} from '@angular/common/http';
import { Observable } from 'rxjs';

const CHECK_TOKEN = new HttpContextToken(() => false)

export function checkToken() {
  return new HttpContext().set(CHECK_TOKEN, true)
}
@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor (
    private tokenService: TokenService
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (CHECK_TOKEN) {
      const req = this.addToken(request)
      return next.handle(req);
    }
    return next.handle(request);
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
