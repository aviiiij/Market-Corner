import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GraphPageComponent } from './graph-page/graph-page.component';
import { HomeComponent } from './home/home.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { NewsPageComponent } from './news-page/news-page.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterPageComponent } from './register-page/register-page.component';

const routes: Routes = [
  { path: 'analyse', component: GraphPageComponent },
  { path: 'news', component: NewsPageComponent},
  { path: 'home', component: HomeComponent},
  { path: 'register', component: RegisterPageComponent},
  { path: 'login', component: LoginPageComponent},
  { path: 'profile', component: ProfileComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
