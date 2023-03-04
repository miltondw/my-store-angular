import { Component, OnInit } from '@angular/core';
import { IUser } from '@app/models/User';
import { AuthService } from '@app/services/auth.service'
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: IUser | null = null
  constructor (private authService: AuthService) { }
  ngOnInit(): void {
    this.authService.user$.subscribe(profile => {
      this.user = profile
    })
  }
}
