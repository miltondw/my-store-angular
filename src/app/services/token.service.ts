import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor () { }
  saveToken(token: string) {
    sessionStorage.setItem('token', token)
  }
  getToken() {
    const token = sessionStorage.getItem('token')
    return token
  }
  deleteToken() {
    sessionStorage.removeItem('token')
  }
}
