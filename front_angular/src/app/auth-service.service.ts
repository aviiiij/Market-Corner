import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './register-page/register-page.component';
import { creds, loggedInUser } from './login-page/login-page.component';
import { Router } from '@angular/router';
import 'rxjs/Rx';



@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  authToken: string = "";
  user:any;

  constructor(private http: HttpClient, private router: Router) { }

  registerUser(user:User){
    return this.http.post<any>('http://localhost:3000/users/register', user);
  }

  authenticateUser(creds: creds) {
    return this.http.post<any>('http://localhost:3000/users/authenticate', creds);
  }

  storeUserData(token: string, user: loggedInUser) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loggedIn() {
    return !!localStorage.getItem('id_token')    
  }

  logoutUser() {
    localStorage.removeItem('id_token')
    localStorage.removeItem('user')
    this.router.navigate(['login'])
  }

  updateUser(changeUser:any) {
    return this.http.post<any>('http://localhost:3000/users/update', changeUser);
    
  }

  deleteUser(id:string) {
    console.log(id);
    this.http.post('http://localhost:3000/users/deleteye', id);
    //this.router.navigate(['register']);

  }
}
