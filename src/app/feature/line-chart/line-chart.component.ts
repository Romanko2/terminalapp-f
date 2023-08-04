import { Component, OnInit } from '@angular/core';
import { FrontendService } from 'src/app/utils/services/frontend.service';
import { Chart } from 'chart.js/auto'
import { DatePipe } from '@angular/common';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {
  timeStamp = new FormControl()
  timeStampArr = [{ name: '1 week', value: 'week_1' }, { name: 'Today', value: 'today' }]
  chart: any = []
  perdayChart: any = []
  perDayGraphData:any[]=[]
  lineChart !: Chart;
  graphdata: any[] = []
  myDate: any;
  timeStampval: any

  constructor(private fs: FrontendService, private datePipe: DatePipe) {
    this.timeStamp.valueChanges.subscribe(res => {
      console.log(res, "response")
      this.timeStampval = res
    })
    this.myDate = new Date();

    console.log(this.datePipe.transform(this.myDate, "yyyy-MM-dd")); //output : 2018-02-13
  }

  ngOnInit(): void {
    this.getEODgraph()
  }
  
  getEODgraph() {
    let data = {
      symbol: 'TSLA',
      limit: 10,
      offset: 10
    }
    this.fs.getgraph('End_of_Day', data).subscribe({
      next: (res: any) => {
        this.graphdata = res.data.data
        const allData = res.data.data
        let tDate: any;
        let dates: any[] = []
        let high: any[] = []
        let close: any[] = []
        let low: any[] = []
        allData.forEach((res: any) => {
          dates.push(res.date)
          high.push(res.high)
          close.push(res.close)
          low.push(res.low)

        })
        this.graphdata.forEach((x: any) => {
          const dateTime = x.date.split('T');
          x.dateOnly = dateTime[0];
          let newDate = x.dateOnly
          console.log(newDate)
          var ctx = document.getElementById('canvas') as HTMLCanvasElement
          this.chart = new Chart(ctx, {
            type: 'line', //this denotes tha type of chart
            data: {
              labels: dates,
              datasets: [
                {
                  label: 'High Prices',
                  data: high,
                  borderColor: 'rgba(255, 99, 132, 1)',
                  backgroundColor: 'rgba(255, 99, 132, 0.2)',
                  borderWidth: 2,
                  fill: true
                },
                {
                  label: 'Low Prices',
                  data: low,
                  borderColor: 'rgba(54, 162, 235, 1)',
                  backgroundColor: 'rgba(54, 162, 235, 0.2)',
                  borderWidth: 2,
                  fill: true
                }
              ]
            },
            options: this.stockChartOptions
          });

        })

        console.log(dates)
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
