import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto'
import { BehaviorService } from 'src/app/shared/behavior.service';
import { FrontendService } from 'src/app/utils/services/frontend.service';

@Component({
  selector: 'app-tickers-chart',
  templateUrl: './tickers-chart.component.html',
  styleUrls: ['./tickers-chart.component.scss']
})
export class TickersChartComponent implements OnInit {

  
  perDayGraphData:any[]=[]
  perdayChart: any = []
  constructor(private fs: FrontendService, private datePipe: DatePipe , private bs:BehaviorService) {
   
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
    this.bs.load(true)
    this.fs.getgraph('Intraday', data).subscribe({
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

  getCurrencies(){
    
  }
  // data = [

  // ];
  // lastData:any
  // constructor(private fs: FrontendService) {

  // }

  // ngOnInit(): void {
  //   let dataa = {
  //     symbol: 'TSLA',
  //     limit: 10,
  //     offset: 10
  //   }
  //   this.fs.getgraph('Intraday', dataa).subscribe({
  //     next: (res: any) => {
  //       this.data = res.data.data
  //       let root = am5.Root.new('intra');
  //       let data = this.data.map((res: any) => {
  //         return { ...res, Date: new Date(res.date).getTime() };
  //       });

  //       root._logo?.dispose();
  //       let stockChart = root.container.children.push(
  //         am5stock.StockChart.new(root, {})
  //       );
  //       let mainPanel = stockChart.panels.push(
  //         am5stock.StockPanel.new(root, {
  //           panX: true,
  //           panY: true,
  //         })
  //       );
  //       let valueAxis = mainPanel.yAxes.push(
  //         am5xy.ValueAxis.new(root, {
  //           renderer: am5xy.AxisRendererY.new(root, {}),
  //         })
  //       );
  //       let dateAxis = mainPanel.xAxes.push(
  //         am5xy.GaplessDateAxis.new(root, {
  //           baseInterval: {
  //             timeUnit: 'day',
  //             count: 1,
  //           },
  //           groupData: true,
  //           renderer: am5xy.AxisRendererX.new(root, {}),
  //         })
  //       );

  //       let valueSeries = mainPanel.series.push(
  //         am5xy.LineSeries.new(root, {
  //           name: 'last',
  //           valueXField: 'Date',
  //           valueYField: 'last',
  //           xAxis: dateAxis,
  //           yAxis: valueAxis,
  //           legendValueText: "{valueY}"
  //         })
  //       );

  //       // let valueSeries2 = mainPanel.series.push(
  //       //   am5xy.LineSeries.new(root, {
  //       //     name: 'Low',
  //       //     valueXField: 'Date',
  //       //     valueYField: 'last',
  //       //     xAxis: dateAxis,
  //       //     yAxis: valueAxis,
  //       //     legendValueText: "{valueY}"
  //       //   })
  //       // );
  //   // Add the tooltip to the series
          
  //       let tooltip = am5.Tooltip.new(root, {
  //         keepTargetHover: true,
  //         getStrokeFromSprite: true,
  //         pointerOrientation: "horizontal",
  //         labelText: "[bold]{name}[/]\n{valueX.formatDate()}: {valueY}",
  //       });

  //       // valueSeries2.strokes.template.setAll({
  //       //   strokeWidth: 2
  //       // });

  //       valueSeries.set("tooltip", tooltip);
  //       // valueSeries2.set("tooltip", tooltip);

  //       valueSeries.data.setAll(data);
  //       // valueSeries2.data.setAll(data);
  //       stockChart.set('stockSeries', valueSeries);
  //       // stockChart.set('stockSeries', valueSeries2);


  //     }
  //   })
  // }

}
