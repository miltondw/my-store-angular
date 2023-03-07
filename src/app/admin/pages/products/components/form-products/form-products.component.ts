import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ICategory, IProduct, ICreateProductDTO,IUpdateProductDTO } from '@app/models/Product';
@Component({
  selector: 'app-form-products',
  templateUrl: './form-products.component.html',
  styleUrls: ['./form-products.component.scss']
})
export class FormProductsComponent {

  isNew:boolean=true

  @Input() categories:ICategory[]= []
  @Input()
  set product(data:IProduct){
    if(data){
      console.log(data)
      this.isNew=false
      this.form.patchValue(data)
      this.categoryField?.setValue(data.category.id)
    }
  }
  @Output() create = new EventEmitter<ICreateProductDTO>();
  @Output() update = new EventEmitter<IUpdateProductDTO>();

  form: FormGroup = new FormGroup({})
  selectedValue: string|null=null;

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
      categoryId: [[''], Validators.required],
      images: [[''], Validators.required],
    })
  }

  save() {
    if (this.form.valid) {
      if (!this.isNew) {
        this.update.emit(this.form.value)
      } else {
        this.create.emit(this.form.value)
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

  get categoryField(){
    return this.form.get('categoryId')
  }
}
