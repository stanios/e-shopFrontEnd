import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, ignoreElements } from 'rxjs';
import { UserAuthService } from '../services/user-auth.service';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private userAuthServ: UserAuthService,
    private router: Router,
    private userServ: UserService
    ) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      
      if(this.userAuthServ.getToken() !== null) {
        const role = route.data["roles"] as Array<string>;

        if(role) {
          const match = this.userServ.roleMatch(role)

          if(match) {
            return true;
          } else {
            this.router.navigate(['/forbidden'])
            return false;
          }
        }
      }

      this.router.navigate(["/login"])
      return false
  }
  
}
