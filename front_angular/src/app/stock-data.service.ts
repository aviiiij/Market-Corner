import { Injectable } from '@angular/core';
import { candlestick,json,series,stamp,metadata } from './candle';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class StockDataService {

  constructor(private http: HttpClient) { }

  getHeroes(ticker: string): Observable<series> {
    console.log(ticker);
    return this.http.get<series>('http://127.0.0.1:5000/'+ticker) ;

    
  }
}
