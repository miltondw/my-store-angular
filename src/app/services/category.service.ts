import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpStatusCode } from '@angular/common/http'
import { environment } from './../../environments/environment'
import { IProduct } from '../models/Product'
import { Observable, throwError } from 'rxjs';

import { catchError } from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private url: string = `${environment.API_URL}/api/categories`
  constructor (
    private http: HttpClient
  ) { }
  getProductsByCategory(id?: string | null) {
    return this.http.get<IProduct[]>(`${this.url}/${id}/products`)
  }
  getCategoryByPage(limit: number, offset: number, id?: string | null): Observable<any> {
    return this.http.get<IProduct[]>(`${this.url}/${id}/products`, {
      params: { limit, offset },
    })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          switch (error.status) {
            case HttpStatusCode.ServiceUnavailable:
              return throwError(() => new Error("Service Unavailable"))
              break;
            case HttpStatusCode.NotFound:
              return throwError(() => new Error("Product Not Found"))
              break;
            default:
              return throwError(() => new Error("Error default"))
          }
        })
      );
  }
}
