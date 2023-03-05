import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { IUser, ICreateUserDTO } from '../models/User'

import { environment } from './../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private url2: string = `${environment.API_URL}/users/`
  constructor (
    private http: HttpClient
  ) { }
  getAll() {
    return this.http.get<IUser[]>(this.url2)
  }
  create(dto: ICreateUserDTO) {
    return this.http.post<IUser>(this.url2, dto)
  }
}
