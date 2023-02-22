import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { IProduct } from '../../models/Product'
import { ProductsService } from '../../services/products.service'

@Component({
  selector: 'app-home',
  template: `<app-products [productId]="productId" [btnMoreActive]="btnMoreActive" [products]="products"  (loadMore)="onLoadMore()" />`,
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products: IProduct[] = [];
  limit: number = 10;
  offset: number = 0;
  btnMoreActive: boolean = true
  countProducts: number = 10
  productId: string | null = null

  constructor (private productsService: ProductsService, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.productsService.getProducts().subscribe((data) => {
      this.countProducts = data.length
    })
    this.productsService.getProductByPage(10, 0)
      .subscribe(data => {
        this.products = data
        this.offset += this.limit
      });
    this.route.queryParamMap.subscribe(params => {
      this.productId = params.get('product')
    })
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
