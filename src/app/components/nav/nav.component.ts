import { Component, OnInit } from '@angular/core';
import { IUser } from './../../models/User';
import { ICategory } from './../../models/Product';
import { StoreService } from '../../services/store.service'
import { AuthService } from '../../services/auth.service'
import { CategoryService } from '../../services/category.service'
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
  profile: IUser = {
    email: "",
    name: "",
    id: 0,
    password: ""
  };
  constructor (
    private storeService: StoreService,
    private authService: AuthService,
    private toastr: ToastrService,
    private categoryService: CategoryService
  ) {

  }

  ngOnInit(): void {
    this.storeService.myCart$.subscribe(products => {
      this.counter = products.length;
    });
    this.getAllCategory()
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }
  getProfile() {
    this.authService.profile().subscribe({
      next: () => {
        this.toastr.success('Login success');
      },
      error: (err) => {
        this.toastr.error(err.error.message);
      }
    })
  }
  loginAndProfile() {
    const user = {
      email: "john@mail.com",
      password: "changeme"
    }
    this.authService.loginAndProfile(user).subscribe({
      next: (data) => {
        this.profile = data
        this.toastr.success('Login success');
      },
      error: (err) => {
        this.toastr.error(err.error.message);
      }
    })
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
