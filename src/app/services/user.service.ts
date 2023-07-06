import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserAuthService } from './user-auth.service';
import { CONSTANTS } from '../models/constans';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  requestHeader = new HttpHeaders(
    { "No-Auth": "True"}
  )

  constructor(
    private http: HttpClient,
    private userAuthServ: UserAuthService
    ) { }

  public login(loginData: NgForm) {
    return this.http.post(CONSTANTS.Url + "/authenticate", loginData,
     { headers: this.requestHeader })
  }


  public forUser() {
    return this.http.get(CONSTANTS.apiUrl + "/forUser", {
      responseType: 'text',
    });
  }

  public forAdmin() {
    return this.http.get(CONSTANTS.apiUrl + "/forAdmin", {responseType:'text'});
  }
   

public roleMatch(allowedRoles: any): boolean {
  let isMatch = false;
  const userRoles: any = this.userAuthServ.getRoles();

  if (userRoles != null && userRoles) {
    for (let i = 0; i < userRoles.length; i++) {
      for (let j = 0; j < allowedRoles.length; j++) {
        if (userRoles[i].roleName === allowedRoles[j]) {
          isMatch = true;
          return isMatch;
        } 
      }
    }
  }
  return isMatch;
}

}
