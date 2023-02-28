import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-basic-form',
  templateUrl: './basic-form.component.html',
  styleUrls: ['./basic-form.component.scss']
})
export class BasicFormComponent implements OnInit {

  nameField = new FormControl()
  categories = new FormControl('');
  categoriesList: string[] = ['Tech', 'Fashion', 'TV', 'Smartphone', 'shoes', 'others'];
  ngOnInit(): void {
    this.nameField.valueChanges.subscribe(v => {
      console.log(v, "Reactive time")
    })
  }
  getName() {
    console.log(this.nameField.value, "value fieldName")
    console.log(this.nameField, "value field")
  }

}
