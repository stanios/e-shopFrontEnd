import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  
  constructor() { }

  public setRoles(roles: []) {
    localStorage.setItem('roles', JSON.stringify(roles));
  }

  public getRoles(): [] {
    let r: string | null = localStorage.getItem('roles')

    if (r != null) {
      return JSON.parse(r)
    }

    return [];
    ;
  }

  public setToken(jwtToken: string) {
    localStorage.setItem('jwtToken', jwtToken);
  }

  public getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }

  public clearStorage() {
    localStorage.clear();
  }

  public isLoggedIn() {
    return this.getRoles() && this.getToken();
  }

  public isaAdmin() {
    const roles: any[] = this.getRoles()
    return roles[0].roleName === 'Admin';
  }

  public isaUser() {
    const roles: any[] = this.getRoles()
    return roles[0].roleName === 'User';
  }
}
