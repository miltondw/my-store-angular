import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent implements OnInit {

  @Input() img = ""
  ngOnInit(): void {
  }
  @Output() loaded = new EventEmitter<string>()
  imgDefault = "https://picsum.photos/100"
  imageError = "https://picsum.photos/150"

  imgError() {
    this.img = this.imageError
    console.log("log error child")
  }
  imgLoaded() {
    this.loaded.emit("/favicon.ico")
    // this.img = "/favicon.ico"
    console.log("img loaded child")
  }
}
