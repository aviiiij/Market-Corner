import { GoogleChartsModule } from 'angular-google-charts';
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




@NgModule({
  declarations: [
    AppComponent,
    GraphPageComponent,
    HomeComponent,
    NewsPageComponent,
    NewsModifierPipe,
    RegisterPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GoogleChartsModule,
    HttpClientModule,
    FormsModule,
    NgApexchartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
