import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpStatusCode } from '@angular/common/http'
import { catchError, map } from 'rxjs/operators'
import { Observable, throwError } from 'rxjs';
import { IProduct, ICreateProductDTO, IUpdateProductDTO } from '../models/Product'
import { environment } from './../../environments/environment'
import { checkTime } from './../interceptors/time.interceptor'
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private url2: string = `${environment.API_URL}/products/`
  // private url1:string = "https://api.escuelajs.co/api/v1/products"
  constructor (
    private http: HttpClient
  ) { }
  getProducts() {
    return this.http.get<IProduct[]>(this.url2)
  }
  getProductByPage(limit: number, offset: number): Observable<any> {
    return this.http.get<IProduct[]>(this.url2, {
      params: { limit, offset },
      context: checkTime()
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
        }),
        map(products => products.map(product => {
          return {
            ...product,
            taxes: 0.19 * product.price
          }
        }))
      );
  }
  getProduct(id: number) {
    const product = this.http.get<IProduct>(this.url2 + id)
    return product
  }
  create(dto: ICreateProductDTO) {
    return this.http.post<IProduct>(this.url2, dto)
  }
  update(id: number, dto: IUpdateProductDTO) {
    return this.http.put<IProduct>(this.url2 + id, dto)
  }
  delete(id: number) {
    return this.http.delete(this.url2 + id)
  }
}
