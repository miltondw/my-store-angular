import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { CategoryService } from '@app/services/category.service'
import {Router} from '@angular/router'

@Component({
  selector: 'app-form-categories',
  templateUrl: './form-categories.component.html',
  styleUrls: ['./form-categories.component.scss']
})
export class FormCategoriesComponent {
form:FormGroup=new FormGroup({})
constructor(
  private fb:FormBuilder,
  private categoryService:CategoryService,
  private router:Router
){
  this.buildForm()
}
private buildForm(){
this.form=this.fb.group({
  name:['',Validators.required],
  image:['',Validators.required]
})
}
save(){
  if(this.form.valid){
    this.categoryService.create(this.form.value).subscribe(()=>{
      this.router.navigate(['/admin/categories/'])
    })
  }else{
    this.form.markAllAsTouched()
  }
}
get nameField(){
  return this.form.get('name')
}
get imageField(){
  return this.form.get('image')
}
}
