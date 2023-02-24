import { Component } from '@angular/core';
import { OnExit } from './../../../guards/exit.guard'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnExit {
  OnExit() {
    return confirm('Do yo like exit?')
  }
}
