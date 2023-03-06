import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ICategory } from '@app/models/Product';

@Component({
  selector: 'app-form-categories',
  templateUrl: './form-categories.component.html',
  styleUrls: ['./form-categories.component.scss']
})
export class FormCategoriesComponent {

  isNew:boolean=true
  @Input()
  set category(data:ICategory){
    if(data){
      console.log(data)
      this.isNew=false
      const update = { image: data.image, name: data.name }
      this.form.patchValue(update)
    }
  }
  @Output() create = new EventEmitter();
  @Output() update = new EventEmitter();

  form: FormGroup = new FormGroup({})

  constructor (
    private fb: FormBuilder,
  ) {
    this.buildForm()
  }

  private buildForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      image: ['', Validators.required]
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

  get nameField() {
    return this.form.get('name')
  }

  get imageField() {
    return this.form.get('image')
  }

}
