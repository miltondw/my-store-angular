import { AuthService } from './services/auth.service';
import { TokenService } from './services/token.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-root',
  template: '<router-outlet />',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit {
  constructor (
    private authService: AuthService,
    private tokenService: TokenService,
  ) { }
  ngOnInit(): void {
    const token = this.tokenService.getToken()
    if (token) {
      this.authService.getProfile().subscribe()
    }
  }

  title = "My-store";
  imgParent = 'https://picsum.photos/400'
  onLoaded(img: string) {
    console.log("loaded from parent", img)
    // this.imgParent = img
  }
}
