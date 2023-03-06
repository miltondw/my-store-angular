import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IProduct } from '../../../models/Product'
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  @Input() product: IProduct = {
    "id": 0,
    "title": "title",
    "price": 0,
    "description": "description",
    "category": {
      id: 0,
      name: "category",
      image: ""
    },
    "images": [],
  }
  @Output() showDetail = new EventEmitter<number>()
  detailActive = false
  @Output() addedProduct = new EventEmitter<IProduct>();
  onAddToCart() {
    this.addedProduct.emit(this.product);
  }
  onShowDetail() {
    this.detailActive = !this.detailActive
    this.showDetail.emit(this.product.id)
  }
  date = new Date('1/02/2023')
}
