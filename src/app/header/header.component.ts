import { Component } from '@angular/core';
import { UserAuthService } from '../services/user-auth.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(
    private userAuthServ: UserAuthService,
    private router: Router,
    public userServ: UserService) {

  }

  public isLoggedIn() {
    return this.userAuthServ.isLoggedIn()
  }

  public logout() {
    this.userAuthServ.clearStorage()
    this.router.navigate(["/"])
  }

  public isAdmin() {
    return this.userAuthServ.isaAdmin()
  }

  public isUser() {
    return this.userAuthServ.isaUser()
  }
}
