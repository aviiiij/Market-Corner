import { Component } from '@angular/core';
import { ChartType } from 'angular-google-charts';
import {StockDataService} from './stock-data.service';
import { candlestick,json,series,stamp,metadata } from './candle';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private stockService: StockDataService) {}

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.stockService.getHeroes(this.ticker)
        .subscribe(values => this.data = values.series.map(x => [x.timestamp,+x.high,+x.close,+x.open,+x.low]));
    console.log(this.data);
  }

  search(): void {
    this.getHeroes();
  }

  title = 'market-corner';
  myType = 'CandlestickChart' as ChartType;
  data: (string | number)[][] = [];
  
  columnNames = ['Date', 'A','B','C','D'];
  options = {
      legend:'none', 
      candlestick: {
        fallingColor: { strokeWidth: 1, stroke:'#a52714', fill:'#a52714' }, // red
        risingColor: { strokeWidth: 1, stroke: '#0f9d58', fill:'#0f9d58' }   // green
      }
  };
  width = 1500;
  height = 600;
  ticker="IBM";

  
}
