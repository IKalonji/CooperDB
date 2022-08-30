import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  userLoggedIn: boolean = false;

  constructor() { }

  loggedIn(loggedIn: boolean) {
    this.userLoggedIn = true;
  }
}
