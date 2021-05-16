import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { NgApexchartsModule } from "ng-apexcharts";
import { GraphPageComponent } from './graph-page/graph-page.component';
import { HomeComponent } from './home/home.component';
import { NewsPageComponent } from './news-page/news-page.component';
import { NewsModifierPipe } from './news-modifier.pipe';
import { RegisterPageComponent } from './register-page/register-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './auth,guard';
import { RouterModule } from '@angular/router';




@NgModule({
  declarations: [
    AppComponent,
    GraphPageComponent,
    HomeComponent,
    NewsPageComponent,
    NewsModifierPipe,
    RegisterPageComponent,
    LoginPageComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgApexchartsModule,
    RouterModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
