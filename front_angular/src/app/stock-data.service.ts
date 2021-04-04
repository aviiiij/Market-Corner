import { Injectable } from '@angular/core';
import { series, companyData, newsData } from './structures';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class StockDataService {

  constructor(private http: HttpClient) { }

  getSeries(ticker: string): Observable<series> {
    console.log(ticker);
    return this.http.get<series>('http://localhost:3000/api/series/'+ticker) ;

    
  }

  getCompanyData(ticker: string): Observable<companyData> {
    console.log(ticker);
    return this.http.get<companyData>('http://localhost:3000/api/overview/'+ticker);
  }

  getNewsData(query: string): Observable<newsData> {
    return this.http.get<newsData>('http://localhost:3000/news/'+query);
  }
}
