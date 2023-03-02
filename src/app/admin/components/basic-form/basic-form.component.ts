import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-basic-form',
  templateUrl: './basic-form.component.html',
  styleUrls: ['./basic-form.component.scss']
})

export class BasicFormComponent {

  categoriesList: string[] = ['Tech', 'Fashion', 'TV', 'Smartphone', 'shoes', 'others']

  constructor (private fb: FormBuilder) { }

  form = this.fb.group({
    phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(15)]],
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    categories: [[""]]
  });
  requiredLength: number = 0
  getErrorMessage(value: string) {
    switch (true) {
      case this.form.get(value)?.hasError('required'):
        return `Your ${value} is required`
        break;
      case this.form.get(value)?.hasError('minlength'):
        this.requiredLength = this.form.get(value)?.getError('minlength')?.requiredLength
        return `Min length ${value} is ${this.requiredLength}`
      case this.form.get(value)?.hasError('maxlength'):
        this.requiredLength = this.form.get(value)?.getError('maxlength')?.requiredLength
        return `Max length ${value} is ${this.requiredLength}`
        break;
      default:
        return null
        break;
    }
  }
  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
    } else {
      this.form.markAllAsTouched()
    }
  }
  invalidValue(value:string) {
    return this.form.get(value)?.touched && this.form.get(value)?.invalid
  }
  get invalidName() {
    return this.name?.touched && this.name?.invalid
  }
  get name() {
    return this.form.get('name')
  }
  get phone() {
    return this.form.get('phone')
  } get categories() {
    return this.form.get('categories')
  }
}
