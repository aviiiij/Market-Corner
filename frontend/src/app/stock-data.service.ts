import { Injectable } from '@angular/core';
import { series, companyData, newsData } from './structures';
import { environment } from '../environments/environment'
import { HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class StockDataService {

  constructor(private http: HttpClient) { }

  getSeries(ticker: string) {
    console.log(ticker);
    return this.http.get<series>(`${environment.apiUrl}api/series/`+ticker) ;

    
  }

  getCompanyData(ticker: string) {
    console.log(ticker);
    return this.http.get<companyData>(`${environment.apiUrl}api/overview/`+ticker);
  }

  getNewsData(query: string) {
    return this.http.get<newsData>(`${environment.apiUrl}news/`+query);
  }
}
