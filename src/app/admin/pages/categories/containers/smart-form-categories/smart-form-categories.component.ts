import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,Params } from '@angular/router'
import { ICategory } from '@app/models/Product';
import { CategoryService } from '@app/services/category.service';

@Component({
  selector: 'app-smart-form-categories',
  templateUrl: './smart-form-categories.component.html',
  styleUrls: ['./smart-form-categories.component.scss']
})
export class SmartFormCategoriesComponent implements OnInit {

  category!: ICategory;
  
  constructor (
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params:Params) => {
      if (params["id"]) {
        this.getCategory(params["id"])
      }
    })
  }

  getCategory(id:number) {
    this.categoryService.getCategory(id)
      .subscribe(data => {
        this.category=data
      })
  }

  createCategory(dto:ICategory) {
    this.categoryService.create(dto)
    .subscribe(() => {
      this.router.navigate(['/admin/categories/'])
    })
  }

  updateCategory(dto:ICategory) {
    this.categoryService
    .update(this.category.id, dto)
      .subscribe(() => {
        this.router.navigate(['/admin/categories/'])
      })
  }
}
