import { Component, OnInit } from '@angular/core';
import * as am5 from '@amcharts/amcharts5';
import * as am5stock from '@amcharts/amcharts5/stock';
import * as am5xy from '@amcharts/amcharts5/xy';
import { FormControl } from '@angular/forms';
import { DatePipe, formatDate } from '@angular/common';
import { FrontendService } from 'src/app/utils/services/frontend.service';

import { Chart } from 'chart.js/auto'
import { BehaviorService } from 'src/app/shared/behavior.service';
import { last } from '@amcharts/amcharts5/.internal/core/util/Array';


@Component({
  selector: 'app-intra-day',
  templateUrl: './intra-day.component.html',
  styleUrls: ['./intra-day.component.scss']
})
export class IntraDayComponent implements OnInit {
  public todayDate: any;
  array:any = []
  public perDayGraphData: any[] = []
  public perdayChart: any = []
  public lastOpen: any;
  public high: any;
  public lastLow: any;
  subtractedDate: any;
  public lastClose: any;
  constructor(private fs: FrontendService, private datePipe: DatePipe, private bs: BehaviorService) {
    let date = new Date()
    let isoDate = date.toISOString()
    const dateTime = isoDate.split('T');
    let dateOnly = dateTime[0];
    this.todayDate = dateOnly
    const inputDate = this.todayDate;
    this.subtractedDate = this.subtractOneDay(inputDate);
    console.log(this.subtractedDate)

  }

  ngOnInit(): void {
    this.getIntradaygraph()

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
  getTimeIn12HourFormat(dateTimeString: string): string {
    const date = new Date(dateTimeString);
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();

    let meridian = 'AM';
    let formattedHours = hours;

    if (hours >= 12) {
      meridian = 'PM';
      formattedHours = hours % 12 || 12;
    }

    const formattedTime = `${formattedHours}:${minutes.toString().padStart(2, '0')} ${meridian}`;
    return formattedTime;
  }

  getIntradaygraph() {
    let data = {
      symbol: 'AAPL',
      limit: 20,
      offset: 20,
      date: this.subtractedDate
    }
    this.bs.load(true)
    this.fs.getgraph('Intraday', data).subscribe({
      next: (res: any) => {
        this.bs.load(false)
        this.perDayGraphData = res.data.data
        const perDayGraphData= res.data.data
        let tDate: any;
        let datess: any[] = []
        let highs: any[] = []
        let closee: any[] = []
        let loww: any[] = []
        perDayGraphData.forEach((res: any) => {
          this.lastOpen = res.open
          this.high = res.open
          this.lastLow = res.low
          this.lastClose = res.close
          const dateTimeString = res.date;
          const timeIn12HourFormat = this.getTimeIn12HourFormat(dateTimeString);
          datess.push(timeIn12HourFormat);
          highs.push(res.high)
          closee.push(res.close)
          loww.push(res.low)

        })
        this.perDayGraphData.forEach((x: any) => {
          const dateTime = x.date.split('T');
          x.dateOnly = dateTime[0];
          let newDate = x.dateOnly
          console.log(newDate)
          var ctx = document.getElementById('perDay') as HTMLCanvasElement
          this.perdayChart = new Chart(ctx, {
            type: 'line', //this denotes tha type of chart
            // data: reversedData.map(item => item.value),
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
    plugins: {
      legend: {
        display: false // Hide the legend
      }
    },
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