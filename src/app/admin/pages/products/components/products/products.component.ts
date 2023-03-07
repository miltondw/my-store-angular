import { Component,OnInit } from '@angular/core';
import { ProductsService } from '@app/services/products.service';
import { IProduct } from '@app/models/Product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit{

  displayedColumns: string[] = ['id', 'title', 'price', 'description', 'category', 'images', 'update', 'delete'];
  dataSource: IProduct[] = [];

  constructor (private productsService: ProductsService) { }

  ngOnInit(): void {
    this.productsService.getProducts()
    .subscribe(data => {
      this.dataSource = data.reverse()
    })
  }

  deleteCategory(id: number) {
    this.productsService.delete(id).subscribe(() => {
      this.productsService.getProducts()
        .subscribe(data => {
          this.dataSource = data
        })
    })
  }
}
