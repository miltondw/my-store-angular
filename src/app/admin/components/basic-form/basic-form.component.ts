import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { IValues } from './Interface'
import { MyValidators } from '@utils/validator'
@Component({
  selector: 'app-basic-form',
  templateUrl: './basic-form.component.html',
  styleUrls: ['./basic-form.component.scss']
})

export class BasicFormComponent {

  categoriesList: string[] = ['Tech', 'Fashion', 'TV', 'Smartphone', 'shoes', 'others']

  form: FormGroup = new FormGroup({});

  constructor (private fb: FormBuilder) {
    this.buildForm()
  }
  regexFullName = /^(?=.{1,20}$)[a-zA-ZÀ-ÖØ-öø-ÿ]+(?:[-' ][a-zA-ZÀ-ÖØ-öø-ÿ]+)*$/;

  private buildForm() {
    this.form = this.fb.group({
      fullName: this.fb.group({
        name: ['', [
          Validators.required, Validators.minLength(3),
          Validators.maxLength(20),
          Validators.pattern(this.regexFullName)
        ]],
        last: ['', [
          Validators.required, Validators.minLength(3),
          Validators.maxLength(20),
          Validators.pattern(this.regexFullName)
        ]],
      }),
      phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(15)]],
      email: ['', [Validators.required, Validators.email]],
      rangePriceMin: ['', [Validators.required, Validators.min(10), Validators.max(100)]],
      rangePriceMax: ['', [Validators.required, Validators.min(10), Validators.max(100)]],
      typeUser: ['company', Validators.required],
      companyName: ['', Validators.required],
      categories: [[""]],
      address:this.fb.array([]),
      stock:[10,Validators.required]
    }, {
      validators: MyValidators.rango
    });
    this.typeUserField?.valueChanges.subscribe(typeUser => {
      if (typeUser == 'company') {
        this.companyNameField?.setValidators([Validators.required])
      } else {
        this.companyNameField?.clearValidators()
      }
      this.companyNameField?.updateValueAndValidity()
    })
  }

  requiredLengthFn = (value: string, error: 'minlength' | 'maxlength', group?: string) => {
    if (group) {
      return this.form.get(`${group}.${value}`)?.getError(error)?.requiredLength
    }
    return this.form.get(value)?.getError(error)?.requiredLength
  }

  getErrorMessage(value: IValues) {
    switch (true) {
      case this.form.get(value.forName)?.hasError('required')
        || this.form.get(`${value.group}.${value.forName}`)?.hasError('required'):
        return `Your ${value.forName.split(/(?=[A-Z])/).join(" ")} is required`
        break;
      case this.form.get(value.forName)?.hasError('email')
        || this.form.get(`${value.group}.${value.forName}`)?.hasError('email'):
        return `Not a valid ${value.forName.split(/(?=[A-Z])/).join(" ")}`
        break;
      case this.form.get(value.forName)?.hasError('minlength')
        || this.form.get(`${value.group}.${value.forName}`)?.hasError('minlength'):
        let rml = this.requiredLengthFn(value.forName, 'minlength')
        if (value.group) {
          rml = this.requiredLengthFn(value.forName, 'minlength', value.group)
        }
        return `Min length ${value.forName.split(/(?=[A-Z])/).join(" ")} is ${rml}`
      case this.form.get(value.forName)?.hasError('maxlength')
        || this.form.get(`${value.group}.${value.forName}`)?.hasError('maxlength'):
        let rl = this.requiredLengthFn(value.forName, 'maxlength')
        if (value.group) {
          rl = this.requiredLengthFn(value.forName, 'maxlength', value.group)
        }
        return `Max length ${value.forName.split(/(?=[A-Z])/).join(" ")} is ${rl}`
        break;
      case this.form.get(value.forName)?.hasError('pattern')
        || this.form.get(`${value.group}.${value.forName}`)?.hasError('pattern'):
        return `Not a valid ${value.forName.split(/(?=[A-Z])/).join(" ")}`
        break;
      case this.form.hasError('invalid_range'):
        return "Price the range is invalid"
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

  validValue(value: IValues) {
    if (value.group) {
      return this.form.get(`${value.group}.${value.forName}`)
        ?.touched && this.form.get(`${value.group}.${value.forName}`)?.invalid
    }
    return this.form.get(value.forName)?.touched && this.form.get(value.forName)?.invalid
  }

  get categories() {
    return this.form.get('categories')
  }
  get rangePriceMin() {
    return this.form.get('rangePriceMin')
  }
  get rangePriceMax() {
    return this.form.get('rangePriceMax')
  }
  get typeUserField() {
    return this.form.get('typeUser')
  }
  get companyNameField() {
    return this.form.get('companyName')
  }
  //Dynamic formFiled
  addAddressField(){
    this.addressField.push(this.createAddressField())
  }
  removeAddressField(id:number){
    this.addressField.removeAt(id)
  }
  createAddressField(){
    return this.fb.group({
      code:['', Validators.required],
      address:['', Validators.required],
    })
  }
  get addressField() {
    return this.form.get('address') as FormArray;
  }

}
