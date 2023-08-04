import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto'
import { FrontendService } from 'src/app/utils/services/frontend.service';

@Component({
  selector: 'app-per-day',
  templateUrl: './per-day.component.html',
  styleUrls: ['./per-day.component.scss']
})
export class PerDayComponent implements OnInit {
  perDayGraphData:any[]=[]
  perdayChart: any = []
  constructor(private fs: FrontendService, private datePipe: DatePipe) {
   
  }


  ngOnInit(): void {
    this.getIntradaygraph()
  }

  getIntradaygraph() {
    let data = {
      symbol: 'AAPL',
      limit: 10,
      offset: 10
    }
    this.fs.getgraph('Intraday', data).subscribe({
      next: (res: any) => {
        this.perDayGraphData = res.data.data
        const perDayGraphData = res.data.data
        let tDate: any;
        let datess: any[] = []
        let highs: any[] = []
        let closee: any[] = []
        let loww: any[] = []
        perDayGraphData.forEach((res: any) => {
          datess.push(res.date)
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
            data: {
              labels: datess,
              datasets: [
                {
                  label: 'High Prices',
                  data: highs,
                  borderColor: 'rgba(255, 99, 132, 1)',
                  backgroundColor: 'rgba(255, 99, 132, 0.2)',
                  borderWidth: 2,
                  fill: true
                },
                {
                  label: 'Low Prices',
                  data: loww,
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

        // console.log(dates)
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
