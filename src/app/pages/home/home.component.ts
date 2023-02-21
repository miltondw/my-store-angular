import { Component, OnInit } from '@angular/core';
import { IProduct, ILoadMore } from '../../models/Product'
import { ProductsService } from '../../services/products.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products: IProduct[] = [];
  limit: number = 10;
  offset: number = 0;
  btnMoreActive: boolean = true
  countProducts: number = 10


  constructor (private productsService: ProductsService,) { }
  ngOnInit(): void {
    this.productsService.getProducts().subscribe((data) => {
      this.countProducts = data.length
    })
    this.productsService.getProductByPage(10, 0)
      .subscribe(data => {
        this.products = data
        this.offset += this.limit
      });
  }
  onLoadMore() {
    this.productsService.getProductByPage(this.limit, this.offset)
      .subscribe(data => {
        this.products = this.products.concat(data)
        this.offset += this.limit
        console.log(this.offset, "offset")
        if (this.products.length === this.countProducts) {
          this.btnMoreActive = false
        }
      });
  }
}
