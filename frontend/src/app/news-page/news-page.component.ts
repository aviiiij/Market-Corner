import { Component, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common";
import { news } from '../structures';
import {StockDataService} from '../stock-data.service';

@Component({
  selector: 'app-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.css']
})
export class NewsPageComponent implements OnInit {
  all_news: news[] = [];
  constructor(private stockService: StockDataService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    const _this = this;
    this.stockService.getNewsData(this.query)
        .subscribe(values => {
            this.all_news = values.newsholder;
          }
        ); 
  }
  query='IBM';

  search(): void {
    this.getData();
  }

}
