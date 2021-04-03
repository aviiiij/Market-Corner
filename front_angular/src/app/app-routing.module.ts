import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GraphPageComponent } from './graph-page/graph-page.component';
import { HomeComponent } from './home/home.component';
import { NewsPageComponent } from './news-page/news-page.component';

const routes: Routes = [
  { path: 'analyse', component: GraphPageComponent },
  { path: 'news', component: NewsPageComponent},
  { path: 'home', component: HomeComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
