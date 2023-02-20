import { TokenService } from './token.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from './../../environments/environment'
import { IAuth, IAuthDTO } from '../models/Auth'
import { IUser } from '../models/User';
import { switchMap, tap } from 'rxjs/operators';
import { checkToken } from './../interceptors/token.interceptor'
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url2: string = `${environment.API_URL}/api/auth`

  constructor (
    private http: HttpClient,
    private tokenService: TokenService

  ) { }

  login(dto: IAuthDTO) {
    return this.http.post<IAuth>(`${this.url2}/login`, dto).pipe(
      tap(
        (res) => this.tokenService.saveToken(res.access_token)
      )
    )
  }
  profile() {
    return this.http.get<IUser>(`${this.url2}/profile`, {
      context: checkToken()
    })
    // , {
    //   headers: {
    //     Authorization: `Bearer ${token}`
    //   }
    // }
  }
  loginAndProfile(dto: IAuthDTO) {
    return this.login(dto)
      .pipe(
        switchMap(() => this.profile())
      )
  }
}
