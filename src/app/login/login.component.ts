import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/user.service';
import { UserAuthService } from '../services/user-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  constructor(
    private userService: UserService,
     private userAuthServ: UserAuthService,
     private router: Router){}


  ngOnInit(): void {
    
  }

  login(loginForm: NgForm) {
    
    this.userService.login(loginForm.value).subscribe({
      next: (response:any) => {
        
        this.userAuthServ.setRoles(response.user.role),
        this.userAuthServ.setToken(response.jwtToken)    
        
        const role = response.user.role[0].roleName;
        if(role === "Admin") {
          this.router.navigate(["/admin"])
        } else {
          this.router.navigate(["/user"])
        }
      },
      error: (error) => {
        console.error(error)
      }
  })
  }

}
