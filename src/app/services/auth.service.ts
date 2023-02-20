import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from './../../environments/environment'
import { IAuth, IAuthDTO } from '../models/Auth'
import { IUser } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url2: string = `${environment.API_URL}/api/auth`

  constructor (
    private http: HttpClient
  ) { }
  login(dto: IAuthDTO) {
    return this.http.post<IAuth>(`${this.url2}/login`, dto)
  }
  profile(token: string) {
    return this.http.get<IUser>(`${this.url2}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }
}
