import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators'
import { IProduct } from '@app/models/Product'
import { ActivatedRoute } from '@angular/router'
import { ProductsService } from '@app/services/products.service'

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  productId: string | null = null;
  product: IProduct = {
    "id": 0,
    "title": "title",
    "price": 0,
    "description": "description",
    "category": {
      id: 0,
      name: "category",
      typeImg: ""
    },
    "images": [],
  }
  constructor (
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private location: Location
  ) { }
  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((paramsRoute) => {
          this.productId = paramsRoute.get('id')
          if (this.productId) {
            return this.productsService.getProduct(Number(this.productId))
          }
          return []
        })).subscribe((product) => {
          this.product = product
        })
  }
  updateProduct() {
    const updateProduct = { title: "title updated" }
    const id = this.product.id
    this.productsService.update(id, updateProduct).subscribe((data) => {
      this.product = data
    })
  }
  deleteProduct() {
    const id = this.product.id
    this.productsService.delete(id).subscribe(() => {
      this.goToBack()
    })
  }
  goToBack() {
    this.location.back()
  }

}
