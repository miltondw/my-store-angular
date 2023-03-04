import { Component, OnInit } from '@angular/core';
import { ICategory } from '@app/models/Product';
import { CategoryService } from '@app/services/category.service'

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'typeImg','update','delete'];
  dataSource:ICategory[] =[];
  constructor (private categoryService: CategoryService) { }
  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(data => {
      this.dataSource = data
      console.log(this.dataSource)
    })
  }
  deleteCategory(id:number){
    console.log(id)
  }
  updateCategory(id:number){
    console.log(id)
  }
}
