import { Component, OnInit } from '@angular/core';
import * as am5 from '@amcharts/amcharts5';
import * as am5stock from '@amcharts/amcharts5/stock';
import * as am5xy from '@amcharts/amcharts5/xy';
import { FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { FrontendService } from 'src/app/utils/services/frontend.service';

import { Chart } from 'chart.js/auto'
import { BehaviorService } from 'src/app/shared/behavior.service';
@Component({
  selector: 'app-stock-chart',
  templateUrl: './stock-chart.component.html',
  styleUrls: ['./stock-chart.component.scss'],
})
export class StockChartComponent implements OnInit {

  perDayGraphData: any[] = []
  eodChart: any = []
  constructor(private fs: FrontendService, private datePipe: DatePipe, private bs: BehaviorService) {

  }


  ngOnInit(): void {
    this.getIntradaygraph()
  }

  getIntradaygraph() {
    let data = {
      symbol: 'AAPL',
      // limit: 30,
      // offset: 30,
     
    }
    this.bs.load(true)
    this.fs.getgraph('End_of_Day', data).subscribe({
      next: (res: any) => {
        this.bs.load(false)
        this.perDayGraphData = res.data.data
        const perDayGraphData = res.data.data
        let tDate: any;
        let datess: any[] = []
        let highs: any[] = []
        let closee: any[] = []
        let loww: any[] = []
        perDayGraphData.forEach((res: any) => {
          datess.push(new Date(res.date).toLocaleDateString('en-us'))
          highs.push(res.high)
          closee.push(res.close)
          loww.push(res.low)

        })
        this.perDayGraphData.forEach((x: any) => {
          const dateTime = x.date.split('T');
          x.dateOnly = dateTime[0];
          let newDate = x.dateOnly
          console.log(newDate)
          var ctx = document.getElementById('eod') as HTMLCanvasElement
          this.eodChart = new Chart(ctx, {
            type: 'line', //this denotes tha type of chart
            data: {
              labels: datess,

              datasets: [
                {
                  label: 'High Prices',
                  data: highs,
                  borderColor: '#80ed99',

                  borderWidth: 2,
                  fill: false
                },
       
              ]
            },
            options: this.stockChartOptions
          });

        })

      },
      error: (err: any) => {

      }
    })
  }

  stockChartOptions = {
    responsive: true,
    maintainAspectRation: false,

    scales: {
      x: {
        grid: {
          display: false
        },
      },
      y: {
        grid: {
          display: false
        },
        beginAtZero: false
      }
    }
  }

}