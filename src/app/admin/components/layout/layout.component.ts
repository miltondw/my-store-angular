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
      name: "Grid Page",
      link: "grid",
      icon: "category"
    },
    {
      name: "Tasks Page",
      link: "tasks",
      icon: "category"
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
