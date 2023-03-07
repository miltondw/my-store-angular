import { Component } from '@angular/core';
import { IItems } from './../../Interfaces.model'
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})

export class LayoutComponent {

  items: IItems[] = [
    {
      name: "Dashboard",
      link: "dashboard",
      icon: "dashboard"
    },
    {
      name: "Products",
      link: "products",
      icon: "store"
    },
    {
      name: "Form Basic",
      link: "form-basic",
      icon: "category"
    },
    {
      name: "Categories",
      link: "categories",
      icon: "category"
    },
  ]
}
