import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { switchMap } from 'rxjs/operators'
import { CategoryService } from '@app/services/category.service'
import { Router, ActivatedRoute } from '@angular/router'
import { ICategory } from '@app/models/Product';

@Component({
  selector: 'app-form-categories',
  templateUrl: './form-categories.component.html',
  styleUrls: ['./form-categories.component.scss']
})
export class FormCategoriesComponent implements OnInit {

  form: FormGroup = new FormGroup({})

  constructor (
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.buildForm()
  }

  categoryId: string | null = null
  categories: ICategory[] | null = null
  category: ICategory | null = null

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((paramsRoute) => {
          this.categoryId = paramsRoute.get('id')
          if (this.categoryId) {
            this.categoryService.getCategory(this.categoryId)
              .subscribe(category => {
                this.category = category
                this.form.patchValue(category)
              })
          }
          return []
        })).subscribe(() => {
          this.router.navigate(['/admin/categories/'])
        })
    this.categoryService.getCategories()
      .subscribe((data) => {
        this.categories = data
      })
  }

  private buildForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      image: ['', Validators.required]
    })
  }

  save() {
    if (this.form.valid && !this.categoryId) {
      console.log(this.categoryId,"a")
      this.categoryService.create(this.form.value)
        .subscribe(() => {
          this.router.navigate(['/admin/categories/'])
        })
    } else if (this.categoryId && this.form.valid) {
      console.log(this.categoryId,"b")
      this.categoryService.update(Number(this.categoryId), this.form.value)
      .subscribe(()=>{
        this.router.navigate(['/admin/categories/'])
      })
    }
    else {
      this.form.markAllAsTouched()
    }

  }
  validValues(value: string) {
    if (this.categoryId) {
      return this.form.get(value)?.invalid
    }
    return this.form.get(value)?.touched && this.form.get(value)?.invalid
  }

  get nameField() {
    return this.form.get('name')
  }

  get imageField() {
    return this.form.get('image')
  }

}
