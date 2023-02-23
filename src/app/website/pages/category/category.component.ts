import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { switchMap } from 'rxjs/operators'
import { IProduct } from './../../../models/Product'
import { CategoryService } from './../../../services/category.service'
@Component({
  selector: 'app-category',
  template: `<h2>
  Category: {{categoryName}}
</h2>
<app-products [btnMoreActive]="btnMoreActive" [productId]="productId" [products]="products"  (loadMore)="onLoadMore()" />
`,
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  products: IProduct[] = []
  productId: string | null = null
  categoryName: string = ""
  limit: number = 10;
  offset: number = 0;
  btnMoreActive: boolean = true
  countProducts: number = 10
  categoryId: string | null = null

  constructor (private route: ActivatedRoute, private categoryService: CategoryService) { }
  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((paramsRoute) => {
          this.categoryId = paramsRoute.get('id')
          if (this.categoryId) {
            return this.categoryService.getCategoryByPage(this.limit, this.offset, this.categoryId)
          }
          return []
        }),
        switchMap((products) => {
          this.products = products
          if (this.products[0].category.name) {
            this.categoryName = this.products[0].category.name
          }
          return this.categoryService.getProductsByCategory(this.categoryId)
        })
      )
      .subscribe(productsAll => {
        this.countProducts = productsAll.length
        if (this.products.length === this.countProducts) {
          this.btnMoreActive = false
        }
      })
    this.route.queryParamMap.subscribe(params => {
      this.productId = params.get('product')
    })
  }
  onLoadMore() {
    this.categoryService.getCategoryByPage(this.limit, this.offset, this.categoryId)
      .subscribe(products => {
        this.products = this.products.concat(products)
        this.offset += this.limit
        if (this.products.length === this.countProducts) {
          this.btnMoreActive = false
        }
      });
  }
}
