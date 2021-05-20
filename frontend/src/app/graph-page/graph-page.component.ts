import { Component, OnInit } from '@angular/core';

import { StockDataService } from '../stock-data.service';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexYAxis,
  ApexXAxis,
  ApexTitleSubtitle,
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  title: ApexTitleSubtitle;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
};

@Component({
  selector: 'app-graph-page',
  templateUrl: './graph-page.component.html',
  styleUrls: ['./graph-page.component.css'],
})
export class GraphPageComponent implements OnInit {
  title = 'Market Corner';
  constructor(private stockService: StockDataService) {}

  ngOnInit() {
    this.getData();
  }

  getData(): void {
    const _this = this;
    this.stockService.getSeries(this.ticker).subscribe((values) => {
      this.chartOptions.series = [
        {
          data: values.series.map((ele) => ({
            x: new Date(ele.timestamp),
            y: [ele.open, ele.high, ele.low, ele.close],
          })),
        },
      ];
    });
    this.stockService.getCompanyData(this.ticker).subscribe((companyData) => {
      this.companyName = companyData.name;
      this.companyDescription = companyData.description;
      this.companyCurrency = companyData.currency;
      this.companyExchange = companyData.exchange;
      this.companySector = companyData.sector;
      this.earningsOptions.series = [
        {
          data: companyData.earnings.map((ele) => ({
            x: new Date(ele.fiscalDateEnding),
            y: ele.reportedEPS,
          })),
        },
      ];
    });
  }

  search(): void {
    this.getData();
  }
  companyName: string = '';
  companyDescription = '';
  companySector = '';
  companyExchange = '';
  companyCurrency = '';
  ticker = 'IBM';
  chart: ChartComponent = new ChartComponent();
  chartOptions: ChartOptions = {
    series: [
      {
        name: 'candle',
        data: [],
      },
    ],
    chart: {
      type: 'candlestick',
      height: 500,
    },
    title: {
      text: 'CandleStick Chart',
      align: 'left',
    },
    xaxis: {
      type: 'datetime',
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
  };

  earningsOptions: ChartOptions = {
    series: [
      {
        name: 'EPS:',
        data: [],
      },
    ],
    chart: {
      type: 'area',
      height: 400,
      zoom: {
        enabled: false,
      },
    },
    title: {
      text: 'Annual Earnings',
      align: 'center',
    },
    xaxis: {
      type: 'datetime',
    },
    yaxis: {
      opposite: true,
    },
  };

  public generateDayWiseTimeSeries(
    baseval: number,
    count: number,
    yrange: { max: number; min: number }
  ) {
    var i = 0;
    var series = [];
    while (i < count) {
      var y =
        Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

      series.push([baseval, y]);
      baseval += 86400000;
      i++;
    }
    return series;
  }
}
