import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { Router } from '@angular/router';

export interface loggedInUser {
  name : string,
  email : string,
  phone : number
}

export interface creds {
  email : string,
  password : string
}


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  constructor(private authservice: AuthServiceService, private router: Router) { }

  ngOnInit(): void {
  }
  creds: creds = {
    email : "example@email.com",
    password : "password",
  }

  onLoginSubmit() {
    

    this.authservice.authenticateUser(this.creds).subscribe(data => {
        if(data.success) {
          console.log(data);
          this.authservice.storeUserData(data.token, data.user);
          this.router.navigate(['home']);
        }
    });
  }
}
