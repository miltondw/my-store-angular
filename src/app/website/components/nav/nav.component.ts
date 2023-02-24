import { Component, OnInit } from '@angular/core';
import { IUser, ICreateUserDTO } from '../../../models/User';
import { ICategory } from '../../../models/Product';
import { StoreService } from '../../../services/store.service'
import { AuthService } from '../../../services/auth.service'
import { CategoryService } from '../../../services/category.service'
import { UsersService } from '../../../services/users.service'
import { ToastrService } from 'ngx-toastr';
import { retry } from 'rxjs/operators'

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  categories: ICategory[] = []
  activeMenu = false;
  counter = 0;
  profile: IUser | null = null;
  user: IUser | null = null;
  constructor (
    private storeService: StoreService,
    private authService: AuthService,
    private toastr: ToastrService,
    private categoryService: CategoryService,
    private usersService: UsersService,
  ) {

  }
  profileUser = {
    email: '',
    password: ''
  }
  ngOnInit(): void {
    this.storeService.myCart$.subscribe(products => {
      this.counter = products.length;
    });
    this.getAllCategory()

    if (!this.user) this.createUser()
    this.authService.user$.subscribe(
      (user) => {
        this.profile = user
      }
    )
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }
  createUser() {
    const newUser: ICreateUserDTO = {
      email: "chirly@estrada.com",
      name: "chirly",
      password: "milton",
    }
    this.usersService.create(newUser).subscribe({
      next: (data) => {
        this.user = data
        this.profileUser = {
          password: this.user.password,
          email: this.user.email
        }
      }
    })
  }
  loginAndGetProfile() {
    this.authService.loginAndProfile(this.profileUser).subscribe({
      next: () => {
        this.toastr.success('Login success');
      },
      error: (err) => {
        this.toastr.error(err.error.message);
      }
    })
  }
  logout() {
    this.authService.logout()
    this.profile = null
  }
  getAllCategory() {
    this.categoryService.getCategories()
      .pipe(
        retry(3)
      )
      .subscribe(categories => {
        if (categories) {
          this.categories = categories
        } else {
          this.categories = []
        }
      })
  }
}
