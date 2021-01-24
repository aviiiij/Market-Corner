import { Injectable } from '@angular/core';
import { candlestick,json,series,stamp,metadata } from './candle';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class StockDataService {

  constructor(private http: HttpClient) { }

  getHeroes() {
    let temp = this.http.get('https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=&interval=15min&apikey=DLNKMATBLTI7J8SR');
    console.log(temp);
    return of([
      ["Mon", 20, 28, 38, 45],
      ["Tue", 31, 38, 55, 66],
      ["Wed", 50, 55, 77, 80],
      ["Thu", 77, 77, 66, 50],
      ["Fri", 68, 66, 22, 15]
   ]);
  }
}
