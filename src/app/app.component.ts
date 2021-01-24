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
    this.stockService.getHeroes()
        .subscribe(values => this.data = values);
    console.log(this.data);
  }
  title = 'market-corner';
  myType = 'CandlestickChart' as ChartType;
  data: (string | number)[][] = [];
  
  columnNames = ['Date', 'A','B','C','D'];
  options = {
      legend:'none', 
      candlestick: {
        fallingColor: { strokeWidth: 2, stroke:'#a52714' }, // red
        risingColor: { strokeWidth: 2, stroke: '#0f9d58' }   // green
      }
  };
  width = 700;
  height = 600;
}
