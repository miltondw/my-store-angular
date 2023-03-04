import { Component, OnInit } from '@angular/core';
import { IUser, ICreateUserDTO } from '@app/models/User';
import { ICategory } from '@app/models/Product';
import { StoreService } from '@app/services/store.service'
import { AuthService } from '@app/services/auth.service'
import { CategoryService } from '@app/services/category.service'
import { UsersService } from '@app/services/users.service'
import { ToastrService } from 'ngx-toastr';
import { retry } from 'rxjs/operators'
import { Router } from '@angular/router'

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
    private router: Router,
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

    // if (!this.user) this.createUser()
    this.authService.user$.subscribe(
      (user) => {
        this.profile = user
        this.user = user
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
      role: 'admin'
    }
    this.usersService.create(newUser).subscribe({
      next: (data) => {
        this.user = data
        this.profileUser = {
          password: this.user.password,
          email: this.user.email,
        }
      }
    })
  }
  loginAndGetProfile() {
    const userAdmin = {
      email: "admin@mail.com",
      password: "admin123"
    }
    this.authService.loginAndProfile(userAdmin).subscribe({
      next: (data) => {
        this.profile = data
        this.router.navigate(['/profile'])
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
