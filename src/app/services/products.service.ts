import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { IProduct } from '../models/Product'
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor (
    private http: HttpClient
  ) { }
  getProducts() {
    const url1 = "https://api.escuelajs.co/api/v1/products"
    const url2 = "https://young-sands-07814.herokuapp.com/api/products"
    const products = this.http.get<IProduct[]>(url2)
    return products
  }
}
