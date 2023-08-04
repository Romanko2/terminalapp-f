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
  isOneMonth:boolean = false
  perDayGraphData: any[] = []
  eodChart: any = []
  constructor(private fs: FrontendService, private datePipe: DatePipe, private bs: BehaviorService) {

  }


  ngOnInit(): void {
    this.getEodgrapgh()
  }

  subtractOneDay(dateString: string): string {
    const parts = dateString.split('-');
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // Month is zero-based (0-11)
    const day = parseInt(parts[2], 10);

    const date = new Date(year, month, day);
    date.setDate(date.getDate() - 1); // Subtract 1 day

    const resultYear = date.getFullYear();
    const resultMonth = date.getMonth() + 1; // Months are zero-based, so add 1
    const resultDay = date.getDate();

    // Format the result in the 'yyy-dd-mm' format
    const formattedResult = `${resultYear}-${resultMonth.toString().padStart(2, '0')}-${resultDay.toString().padStart(2, '0')}`;
    return formattedResult;
  }


  formatDateToCustomFormat(dateString: any): any {
    const date = new Date(dateString);
    const options: any = { day: '2-digit', month: 'short' };

    return date.toLocaleDateString('en', options);
  }
 
  getEodByMonth(){
    this.isOneMonth = true
    let data = {
      symbol: 'TSLA',
      // limit: 100,
      // offset: 100,
      month:1
    }
    this.bs.load(true)
    this.fs.getgraph('End_of_Day', data).subscribe({
      next: (res: any) => {
        this.bs.load(false)
        let data = res.data.data
        this.perDayGraphData = data.reverse()
        let tDate: any;
        let datess: any[] = []
        let highs: any[] = []
        let closee: any[] = []
        let loww: any[] = []


        this.perDayGraphData.forEach((res: any) => {

          // datess.push(new Date(res.date).toLocaleDateString('en'))
          datess.push(this.formatDateToCustomFormat(res.date))
          highs.push(res.high)
          closee.push(res.close)
          loww.push(res.low)

        })
        this.perDayGraphData.forEach((x: any) => {

          const dateTime = x.date.split('T');
          x.dateOnly = dateTime[0];
          let newDate = x.dateOnly
          var ctx = document.getElementById('eod') as HTMLCanvasElement
          this.eodChart = new Chart(ctx, {
            type: 'line', //this denotes tha type of chart
            data: {
              labels: datess,
              datasets: [
                {
                  // label: 'High Prices',
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
  
  getEodgrapgh() {
    let data = {
      symbol: 'AAPL',
      // limit: 100,
      // offset: 100,

    }
    this.bs.load(true)
    this.fs.getgraph('End_of_Day', data).subscribe({
      next: (res: any) => {
        this.bs.load(false)
        let data = res.data.data
        this.perDayGraphData = data.reverse()
        let tDate: any;
        let datess: any[] = []
        let highs: any[] = []
        let closee: any[] = []
        let loww: any[] = []


        this.perDayGraphData.forEach((res: any) => {

          // datess.push(new Date(res.date).toLocaleDateString('en'))
          datess.push(this.formatDateToCustomFormat(res.date))
          highs.push(res.high)
          closee.push(res.close)
          loww.push(res.low)

        })
        this.perDayGraphData.forEach((x: any) => {

          const dateTime = x.date.split('T');
          x.dateOnly = dateTime[0];
          let newDate = x.dateOnly
          var ctx = document.getElementById('eod') as HTMLCanvasElement
          this.eodChart = new Chart(ctx, {
            type: 'line', //this denotes tha type of chart
            data: {
              labels: datess,
              datasets: [
                {
                  // label: 'High Prices',
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

    plugins: {
      legend: {
        display: false // Hide the legend
      }
    },
    scales: {
      x: {
        grid: {
          display: true
        },
      },
      y: {
        grid: {
          display: true
        },
        beginAtZero: false
      }
    }
  }



  filterDataByTimeRange(days: number): any[] {
    // Filter data based on the selected time range
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    return this.perDayGraphData.filter((item) => {
      console.log(item.date)
      const date = new Date(item.date);
      return date >= startDate && date <= endDate;
    });
  }
}