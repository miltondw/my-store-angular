import { Component, OnInit } from '@angular/core';
import { IUser } from './../../models/User';
import { StoreService } from '../../services/store.service'
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  activeMenu = false;
  counter = 0;
  profile: IUser = {
    email: "",
    name: "",
    id: 0,
    password: ""
  };
  constructor (
    private storeService: StoreService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.storeService.myCart$.subscribe(products => {
      this.counter = products.length;
    });
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }
  getProfile() {
    this.authService.profile().subscribe({
      next: (data) => {
        console.log(data)
      }
    })
  }
  loginAndProfile() {
    const user = {
      email: "chirly@estrada.com",
      password: "milton"
    }
    this.authService.loginAndProfile(user).subscribe({
      next: (data) => {
        this.profile = data
      }
    })
  }
}
