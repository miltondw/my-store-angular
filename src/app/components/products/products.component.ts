import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
//services
import { ProductsService } from '../../services/products.service'
import { UsersService } from '../../services/users.service'
import { AuthService } from '../../services/auth.service'
import { FilesService } from '../../services/files.service'
import { StoreService } from '../../services/store.service'
//Models
import { IProduct, ICreateProductDTO } from '../../models/Product'
import { IUser, ICreateUserDTO } from './../../models/User';
import { IfileImg } from './../../models/File';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})

export class ProductsComponent implements OnInit {
  products: IProduct[] = [];
  users: IUser[] = []
  profile: IUser = {
    email: "",
    name: "",
    id: 0,
    password: ""
  };
  imgRta: IfileImg = {
    filename: "",
    location: "",
    originalname: ""
  }
  countProducts: number = 10
  productDetail: IProduct = {
    "id": 0,
    "title": "title",
    "price": 0,
    "description": "description",
    "category": {
      id: 0,
      name: "category",
      typeImg: ""
    },
    "images": []
  }
  limit: number = 10;
  offset: number = 0;
  myShoppingCart: IProduct[] = [];
  total = 0;
  constructor (
    private productsService: ProductsService,
    private toastr: ToastrService,
    private usersService: UsersService,
    private authService: AuthService,
    private filesService: FilesService,
    private storeService: StoreService,
  ) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }
  detailActive: boolean = false
  btnMoreActive: boolean = true
  statusDetail: 'loading' | 'success' | 'error' | 'init' = 'init'

  // CUD Product
  createProduct() {
    const newProduct: ICreateProductDTO = {
      "title": "title",
      "price": 120,
      "description": "I'm a description",
      "categoryId": 1,
      "images": ["https://picsum.photos/200/", "https://picsum.photos/201/", "https://picsum.photos/203/"]
    }
    this.productsService.create(newProduct)
      .subscribe((data: IProduct) => {
        this.products.unshift(data)
      })
  }
  updateProduct() {
    const updateProduct = { title: "title updated" }
    const id = this.productDetail.id
    this.productsService.update(id, updateProduct).subscribe((data) => {
      const productIndex = this.products.findIndex(p => p.id === id)
      this.products[productIndex] = data
      this.productDetail = data
    })
  }
  deleteProduct() {
    const id = this.productDetail.id
    this.productsService.delete(id).subscribe(() => {
      const productIndex = this.products.findIndex(p => p.id === id)
      this.products.splice(productIndex, 1)
      this.toggleDetail()
    })
  }
  // CUD User
  createUser() {
    const newUser: ICreateUserDTO = {
      email: "chirly@estrada.com",
      name: "chirly",
      password: "milton"
    }
    this.usersService.create(newUser).subscribe({
      next: (data) => {
        this.users.unshift(data)
      }
    })
  }
  Login() {
    const user = {
      email: "chirly@estrada.com",
      password: "milton"
    }
    this.authService.login(user)
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



  ngOnInit(): void {
    this.productsService.getProducts()
      .subscribe({
        next: (data) => {
          this.countProducts = data.length
        },
        error(err) {
          console.log(err, "Error")
        },
      })
    this.productsService.getProductByPage(10, 0)
      .subscribe(data => {
        this.products = data
        this.offset += this.limit
      });
    //Users
    this.usersService.getAll().subscribe((data) => {
      this.users = data
      // console.log(this.users, "users")
    })
  }
  onAddToShoppingCart(product: IProduct) {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }
  //Detail
  toggleDetail() {
    this.detailActive = !this.detailActive
  }
  onShowDetail(id: number) {
    this.statusDetail = 'loading'
    this.productsService.getProduct(id)
      .subscribe({
        next: (data) => {
          this.toggleDetail()
          this.productDetail = data
          this.statusDetail = 'success'
          this.toastr.success('Operación exitosa', '¡Genial!');
        },
        error: (err) => {
          this.statusDetail = 'error'
          this.toastr.error(err.error.message);

        }
      })
  }
  loadMore() {
    this.productsService.getProductByPage(this.limit, this.offset)
      .subscribe(data => {
        this.products = this.products.concat(data)
        this.offset += this.limit
        if (this.products.length === this.countProducts) {
          this.btnMoreActive = false
        }
      });
  }
  //Files
  dowloadPDF() {
    const file = {
      name: "my.pdf",
      type: "application/pdf",
      url: "https://young-sands-07814.herokuapp.com/api/files/dummy.pdf"
    }
    this.filesService.getFile(file).subscribe((res) => console.log(res))
  }
  onUploadFile(e: Event) {
    const element = e.target as HTMLInputElement
    const file = element.files?.item(0)
    if (file) {
      this.filesService.uploadFile(file)
        .subscribe((rta) => {
          this.imgRta = rta
        })
    }
  }
}
