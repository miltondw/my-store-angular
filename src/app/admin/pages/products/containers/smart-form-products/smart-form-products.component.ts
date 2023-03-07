import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,Params } from '@angular/router'
import { ICategory, IProduct,ICreateProductDTO,IUpdateProductDTO} from '@app/models/Product';
import { CategoryService } from '@app/services/category.service';
import { ProductsService } from '@app/services/products.service';

@Component({
  selector: 'app-smart-form-products',
  templateUrl: './smart-form-products.component.html',
  styleUrls: ['./smart-form-products.component.scss']
})
export class SmartFormProductsComponent implements OnInit {
  categories!: ICategory[];
  product!:IProduct;
  constructor (
    private categoryService: CategoryService,
    private productsService: ProductsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params:Params) => {
      if (params["id"]) {
        this.getProduct(params["id"])
      }
      this.getCategories()
    })
  }

  getCategories() {
    this.categoryService.getCategories()
      .subscribe(data => {
        this.categories=data
      })
  }

  getProduct(id:number) {
    this.productsService.getProduct(id)
      .subscribe((data) => {
        this.product=data
      })
  }

  createProduct(dto:ICreateProductDTO) {
    if(!Array.isArray(dto.images)){
      dto.images=Array(dto.images)
    }
    this.productsService.create(dto)
    .subscribe(() => {
      this.router.navigate(['/admin/products/'])
    })
  }

  updateProduct(dto:IUpdateProductDTO) {
    console.log(dto,"update")
    this.productsService
    .update(this.product.id, dto)
      .subscribe(() => {
        this.router.navigate(['/admin/products/'])
      })
  }
}
