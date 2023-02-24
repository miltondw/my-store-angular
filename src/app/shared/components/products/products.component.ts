import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
//services
import { ToastrService } from 'ngx-toastr';
import { ProductsService } from '../../../services/products.service'
import { UsersService } from '../../../services/users.service'
// import { FilesService } from '../../services/files.service'
import { StoreService } from '../../../services/store.service'
//Models
import { IProduct, ICreateProductDTO, ILoadMore } from '../../../models/Product'
import { IUser } from '../../../models/User';
// import { IFileImg } from './../../models/File';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})

export class ProductsComponent implements OnInit {

  @Input() products: IProduct[] = [];
  @Input()
  set productId(id: string | null) {
    if (id) {
      this.onShowDetail(Number(id))
    }
  }
  @Output() loadMore = new EventEmitter<ILoadMore>();
  @Input() btnMoreActive: boolean = true

  onLoadMore() {
    this.loadMore.emit()
  }

  users: IUser[] = []

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

  myShoppingCart: IProduct[] = [];
  total: number = 0;

  constructor (
    private productsService: ProductsService,
    private toastr: ToastrService,
    private usersService: UsersService,
    // private filesService: FilesService,
    private storeService: StoreService,
  ) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }
  detailActive: boolean = false
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



  ngOnInit(): void {
    //Users
    this.usersService.getAll().subscribe((data) => {
      this.users = data
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
    if (!this.detailActive) {
      this.detailActive = true;
    }
    this.productsService.getProduct(id)
      .subscribe({
        next: (data: IProduct) => {
          this.productDetail = data
          this.statusDetail = 'success'
        },
        error: (err: any) => {
          this.statusDetail = 'error'
          this.toastr.error(err.error.message);
        }
      })
  }
  // imgRta: IFileImg = {
  //   filename: "",
  //   location: "",
  //   originalname: ""
  // }
  updateProduct() {
    const updateProduct = { title: "title updated" }
    const id = this.productDetail.id
    this.productsService.update(id, updateProduct).subscribe((data) => {
      const productIndex = this.products.findIndex(p => p.id === id)
      this.products[productIndex] = data
      this.productDetail = data
      this.toastr.success('Operación exitosa', '¡Genial!');

    })
  }
  deleteProduct() {
    const id = this.productDetail.id
    this.productsService.delete(id).subscribe(() => {
      const productIndex = this.products.findIndex(p => p.id === id)
      this.products.splice(productIndex, 1)
      this.toastr.success('Operación exitosa', '¡Genial!');
      this.toggleDetail()
    })
  }
  // Create User
  //Files
  // downloadPDF() {
  //   const file = {
  //     name: "my.pdf",
  //     type: "application/pdf",
  //     url: "https://damp-spire-59848.herokuapp.com/api/files/dummy.pdf"
  //   }
  //   this.filesService.getFile(file).subscribe((res) => console.log(res))
  // }
  // onUploadFile(e: Event) {
  //   const element = e.target as HTMLInputElement
  //   const file = element.files?.item(0)
  //   if (file) {
  //     this.filesService.uploadFile(file)
  //       .subscribe((rta) => {
  //         this.imgRta = rta
  //       })
  //   }
  // }
}
