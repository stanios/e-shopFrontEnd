import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent  implements OnInit{

  message:any;


  constructor(private userServ: UserService) {}


  ngOnInit(): void {
    this.forUser()
  }

  forUser() {
    this.userServ.forUser().subscribe({
      next: (response:any) => {
      
        console.log(response)
        this.message = response;
      }, 
      error: (error) => {
        console.log(error)
      }
    }
    )
  }

}
