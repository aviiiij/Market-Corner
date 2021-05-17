import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './register-page/register-page.component';
import { creds, loggedInUser } from './login-page/login-page.component';
import { Router } from '@angular/router';
import { environment } from '../environments/environment'
//import { environment } from '../environments/environment.prod'




@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  authToken: any = "";
  user:any;

  constructor(private http: HttpClient, private router: Router) { }

  registerUser(user:User){
    return this.http.post<any>(`${environment.apiUrl}users/register`, user);
  }

  authenticateUser(creds: creds) {
    return this.http.post<any>(`${environment.apiUrl}users/authenticate`, creds);
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
    this.loadToken();
    let headers = new HttpHeaders()
    .set('Authorization', this.authToken)
    
    console.log(headers);
    return this.http.post<any>(`${environment.apiUrl}users/update`, changeUser, {headers: headers});
    
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  deleteUser(id:string) {
    this.loadToken();
    let headers = new HttpHeaders()
    .set('Authorization', this.authToken)
    return this.http.post(`${environment.apiUrl}users/deleteye`, {"id":id}, {headers: headers});

  }
}
