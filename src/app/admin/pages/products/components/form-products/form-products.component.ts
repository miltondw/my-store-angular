import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ICategory, IProduct, ICreateProductDTO, IUpdateProductDTO } from '@app/models/Product';
@Component({
  selector: 'app-form-products',
  templateUrl: './form-products.component.html',
  styleUrls: ['./form-products.component.scss']
})
export class FormProductsComponent {

  isNew: boolean = true

  @Input() categories: ICategory[] = []
  @Input()
  set product(data: IProduct) {
    if (data) {
      this.isNew = false
      this.categoryField?.setValue(data.category.id)
      this.form.patchValue(data)
    }
  }
  @Output() create = new EventEmitter<ICreateProductDTO>();
  @Output() update = new EventEmitter<IUpdateProductDTO>();

  form: FormGroup = new FormGroup({})

  constructor (
    private fb: FormBuilder,
  ) {
    this.buildForm()
  }

  private buildForm() {
    this.form = this.fb.group({
      title: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      categoryId: ['', Validators.required],
      images: [[''], Validators.required],
    })
  }

  save() {
    if (this.form.valid) {
      if (this.isNew) {
        this.create.emit(this.form.value)
      } else {
        this.update.emit(this.form.value)
        console.log(this.form.value,"save")
      }
    }
    else {
      this.form.markAllAsTouched()
    }
  }

  validValues(value: string) {
    return this.form.get(value)?.touched && this.form.get(value)?.invalid
  }

  get titleField() {
    return this.form.get('title')
  }

  get imagesField() {
    return this.form.get('images')
  }

  get categoryField() {
    return this.form.get('categoryId')
  }
}
