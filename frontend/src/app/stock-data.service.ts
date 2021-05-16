import { Injectable } from '@angular/core';
import { series, companyData, newsData } from './structures';

import { HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class StockDataService {

  constructor(private http: HttpClient) { }

  getSeries(ticker: string) {
    console.log(ticker);
    return this.http.get<series>('https://marketcornerbackend.herokuapp.com/api/series/'+ticker) ;

    
  }

  getCompanyData(ticker: string) {
    console.log(ticker);
    return this.http.get<companyData>('https://marketcornerbackend.herokuapp.com/api/overview/'+ticker);
  }

  getNewsData(query: string) {
    return this.http.get<newsData>('https://marketcornerbackend.herokuapp.com/news/'+query);
  }
}
