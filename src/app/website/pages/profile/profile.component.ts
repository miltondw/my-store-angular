import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/models/User';
import { AuthService } from '../../../services/auth.service'
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: IUser | null = null
  constructor (private authService: AuthService) { }
  ngOnInit(): void {
    this.authService.profile().subscribe(profile => {
      this.user = profile
    })
  }
}
