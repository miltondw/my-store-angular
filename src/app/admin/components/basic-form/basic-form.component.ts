import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-basic-form',
  templateUrl: './basic-form.component.html',
  styleUrls: ['./basic-form.component.scss']
})
export class BasicFormComponent implements OnInit {

  nameField = new FormControl()
  categories = new FormControl();
  myGroup: FormGroup;
  categoriesList: string[] = ['Tech', 'Fashion', 'TV', 'Smartphone', 'shoes', 'others'];
  constructor () {
    this.myGroup = new FormGroup({
      phone: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(15)])
    });
  }
  ngOnInit(): void {
    this.nameField.valueChanges.subscribe(v => {
      console.log(v, "Reactive time")
    })
  }
  getName() {
    console.log(this.nameField.value, "value fieldName")
    console.log(this.nameField, "value field")
  }

  getErrorMessage() {
    switch (this.myGroup.get('phone')?.touched) {
      case this.myGroup.get('phone')?.hasError('required'):
        return "Your Phone is required"
        break;
      case this.myGroup.get('phone')?.hasError('minlength'):
        return "Min length is 10"
        break;
      case this.myGroup.get('phone')?.hasError('maxlength'):
        return "Max length is 15"
        break;
      default:
        return ""
        break;
    }
  }

}
