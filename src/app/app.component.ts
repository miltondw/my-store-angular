import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent {
  title = "My-store";
  imgParent = 'https://picsum.photos/400'
  onLoaded(img: string) {
    console.log("loaded from parent", img)
    // this.imgParent = img
  }
}
