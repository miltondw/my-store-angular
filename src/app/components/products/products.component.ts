import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service'
import { IProduct } from '../../models/Product'
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})

export class ProductsComponent implements OnInit {
  products: IProduct[] = [];

  constructor (private productsService: ProductsService) { }


  ngOnInit(): void {
    this.productsService.getProducts().subscribe(data => {this.products = data});
  }

}
