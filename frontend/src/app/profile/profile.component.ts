import { TitleCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';
import { loggedInUser } from '../login-page/login-page.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private authservice: AuthServiceService, private router: Router) { }

  ngOnInit(): void {
  }
  stringuser:any = localStorage.getItem('user');
  user = JSON.parse(this.stringuser);
  editable = false;

  toggleEdit() {
    this.editable = !this.editable;
  }
  formUser = {
    name: this.user.name ,
    email: this.user.email,
    phone: this.user.phone
  }
  submit() {
    var id = this.user.id
    this.user = this.formUser;
    this.user.id = id;
    console.log(this.formUser);
    console.log(this.user);
    localStorage.setItem('user', JSON.stringify(this.user));
    this.authservice.updateUser(this.user).subscribe(data => {})
    this.editable = !this.editable;    


  }

  delete() {
    var id = this.user.id;
    console.log('function');
    console.log(id);
    this.authservice.deleteUser(id).subscribe(data => {});
    localStorage.removeItem('id_token');
    localStorage.removeItem('user');
    this.router.navigate(['register']);
  }
}
