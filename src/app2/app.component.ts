import { Component } from '@angular/core';
import { IUser, IRegister } from './Interfaces.model'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent {
  register: IRegister = {
    name: '',
    email: '',
    password: ''
  }
  emojis: string[] = ['😂', '🐦', '🐳', '🌮', '💚']
  newEmoji: string = ""
  user: IUser = {
    name: 'Milton',
    age: 21,
  }
  box = {
    width: 100,
    height: 100,
    background: 'red',
  }
  btnDisabled: boolean = true;
  show: boolean = false;
  toggleClick() {
    this.btnDisabled = !this.btnDisabled
    this.show = !this.show
  }
  incrementAge() {
    this.user.age += 1
  }
  onScroll(e: Event) {
    const element = e.target as HTMLElement;
    console.log(element.scrollTop)
  }
  onChange(e: Event) {
    const input = e.target as HTMLInputElement;
    this.user.name = input.value
  }
  addEmoji() {
    this.emojis.push(this.newEmoji)
    this.newEmoji = ""
  }
  removeEmoji(i: number) {
    this.emojis.splice(i, 1)
  }
  onRegister() {
    console.log(this.register)
  }
}
