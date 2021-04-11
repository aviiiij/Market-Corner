import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';

export interface User {
  name : string,
  email : string,
  password : string,
  phone : number
}


@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})



export class RegisterPageComponent implements OnInit {

  constructor(private authservice: AuthServiceService) { }

  ngOnInit(): void {
  }
  user: User = {
    name : 'your name',
    email : "example@email.com",
    password : "password",
    phone : 123456789
  };

  onSubmit () {
    console.log(this.user);
    this.authservice.registerUser(this.user).subscribe(values => console.log(values));
  }
}
