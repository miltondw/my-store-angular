import { TokenService } from './token.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router'
import { environment } from './../../environments/environment'
import { IAuth, IAuthDTO } from '../models/Auth'
import { IUser } from '../models/User';
import { switchMap, tap } from 'rxjs/operators';
import { checkToken } from './../interceptors/token.interceptor'
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url2: string = `${environment.API_URL}/auth`

  private user = new BehaviorSubject<IUser | null>(null);
  user$ = this.user.asObservable();

  constructor (
    private http: HttpClient,
    private tokenService: TokenService,
    private router: Router

  ) { }

  login(dto: IAuthDTO) {
    return this.http.post<IAuth>(`${this.url2}/login`, dto).pipe(
      tap(
        (res) => this.tokenService.saveToken(res.access_token)
      )
    )
  }
  logout() {
    this.tokenService.deleteToken()
    this.router.navigate(['/home'])
  }
  getProfile() {
    return this.http.get<IUser>(`${this.url2}/profile`, {
      context: checkToken()
    }).pipe(
      tap((user) => {
        return this.user.next(user)
      })
    )
    // , {
    //   headers: {
    //     Authorization: `Bearer ${token}`
    //   }
    // }
  }
  loginAndProfile(dto: IAuthDTO) {
    return this.login(dto)
      .pipe(
        switchMap(() => this.getProfile())
      )
  }
}
