import { Component, Input } from '@angular/core';
import { IProduct } from '../../models/Product'
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
      typeImg: ""
    },
    "images": []
  }
  date = new Date('1/02/2023')
}
