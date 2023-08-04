import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js/auto'
import { AmChartsService, AmChart } from '@amcharts/amcharts3-angular';
import { FrontendService } from 'src/app/utils/services/frontend.service';
import { StockChart } from 'angular-highcharts';
@Component({
  selector: 'app-highchart',
  templateUrl: './highchart.component.html',
  styleUrls: ['./highchart.component.scss']
})
export class HighchartComponent {
  
  chartInfo: any;
  labeldata: any[] = [];
  realdata: any[] = [];
  colordata: any[] = [];
  date:any[]=[]
  data: number[] = [100, 200, 90, 120]
  stockChart!: Chart
  chart!: AmChart;
  constructor(private AmCharts: AmChartsService, private frontendService: FrontendService) { }
	chartOptions = {
		animationEnabled: true,
		theme: "light2",
		title: {
			text: "New York Climate - 2021"
		},
		axisX: {
			valueFormatString: "MMM",
			intervalType: "month",
			interval: 1
		},
		axisY: {
			title: "Temperature",
		  suffix: "°F"
		},
		toolTip: {
			shared: true
		},
		legend: {
			cursor: "pointer",
			itemclick: function(e: any){
				if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
					e.dataSeries.visible = false;
				} else{
					e.dataSeries.visible = true;
				}
				e.chart.render();
			}
		},
		data: [{
			type:"line",
			name: "Minimum",
			showInLegend: true,
			yValueFormatString: "#,###°F",
			dataPoints: [		
				{ x: new Date(2021, 0, 1), y: 27 },
				{ x: new Date(2021, 1, 1), y: 28 },
				{ x: new Date(2021, 2, 1), y: 35 },
				{ x: new Date(2021, 3, 1), y: 45 },
				{ x: new Date(2021, 4, 1), y: 54 },
				{ x: new Date(2021, 5, 1), y: 64 },
				{ x: new Date(2021, 6, 1), y: 69 },
				{ x: new Date(2021, 7, 1), y: 68 },
				{ x: new Date(2021, 8, 1), y: 61 },
				{ x: new Date(2021, 9, 1), y: 50 },
				{ x: new Date(2021, 10, 1), y: 41 },
				{ x: new Date(2021, 11, 1), y: 33 }
			]
		},
		{
			type: "line",
			name: "Maximum",
			showInLegend: true,
			yValueFormatString: "#,###°F",
			dataPoints: [
				{ x: new Date(2021, 0, 1), y: 40 },
				{ x: new Date(2021, 1, 1), y: 42 },
				{ x: new Date(2021, 2, 1), y: 50 },
				{ x: new Date(2021, 3, 1), y: 62 },
				{ x: new Date(2021, 4, 1), y: 72 },
				{ x: new Date(2021, 5, 1), y: 80 },
				{ x: new Date(2021, 6, 1), y: 85 },
				{ x: new Date(2021, 7, 1), y: 84 },
				{ x: new Date(2021, 8, 1), y: 76 },
				{ x: new Date(2021, 9, 1), y: 64 },
				{ x: new Date(2021, 10, 1), y: 54 },
				{ x: new Date(2021, 11, 1), y: 44 }
			]
		}]
	}	
  ngOnInit() {
    this.getEODgraph()
    this.getEODgraph()
    this.createStockChart()
  }

  getEODgraph() {
    let data = {
      symbol: 'TSLA',
      limit: 10,
      offset: 10
    }
    this.frontendService.getgraph('End_of_Day', data).subscribe({
      next: (res: any) => {
        this.chartInfo = res.data.data;
        console.log(this.chartInfo)
        // if(this.chartInfo !== null){
        //   this.chartInfo.forEach((element:any) => {
        //     console.log(element , "==")
        //     this.labeldata.push(element.open)
        //     this.realdata.push(element.close)
        //     this.date.push(element.date)
        //   });
        //   this.createStockChart()
        //   this.createChart(this.labeldata, this.realdata, this.colordata);
        // }
       
        if (this.chartInfo != null) {
          for (let i = 0; i < this.chartInfo.length;  i++) {
            this.labeldata.push(this.chartInfo[i].open);
            this.realdata.push(this.chartInfo[i].close);
            this.colordata.push(this.chartInfo[i].colorcode);
            this.date.push(this.chartInfo[i].date)

          }
          console.log(this.labeldata, "lABEL dATA======")
          console.log(this.realdata, "Real dATA======")
          console.log(this.date , "==date==")
          this.createStockChart()
          this.createChart(this.labeldata, this.realdata, this.colordata);
        }
      },
      error: (err: any) => {
        // this.toastr.error(err.message)
      }
    })
  }
  createChart(labeldata: any, realdata: any, colordata: any) {
    this.chart = new Chart('MyChart', {
      type: 'line', //this denotes tha type of chart
      data: {
        labels: labeldata,
        datasets: [
          {
            label: 'No of sales',
            data: realdata,
            backgroundColor: colordata,
          },
        ],
      },
      options: {
        aspectRatio: 2,
      },
    });
  }

  private createStockChart() {
  //   const ctx = document.getElementById('stockChart') as HTMLCanvasElement;
  //   this.stockChart = new Chart(ctx, {
  //     type: 'line',
  //     data: this.stockChartData,
  //     options: this.stockChartOptions
  //   })
  // }
  const ctx = document.getElementById("myChart") as HTMLCanvasElement;

var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ["Tokyo",	"Mumbai",	"Mexico City",	"Shanghai",	"Sao Paulo",	"New York",	"Karachi","Buenos Aires",	"Delhi","Moscow"],
        datasets: [{
            label: 'Series 1', // Name the series
            data: [500,	50,	2424,	14040,	14141,	4111,	4544,	47,	5555, 6811], // Specify the data values array
            fill: false,
            borderColor: '#2196f3', // Add custom color border (Line)
            backgroundColor: '#2196f3', // Add custom color background (Points and Fill)
            borderWidth: 1 // Specify bar border width
        },
                  {
            label: 'Series 2', // Name the series
            data: [1288,	88942,	44545,	7588,	99,	242,	1417,	5504,	75, 457], // Specify the data values array
            fill: false,
            borderColor: '#4CAF50', // Add custom color border (Line)
            backgroundColor: '#4CAF50', // Add custom color background (Points and Fill)
            borderWidth: 1 // Specify bar border width
        },
        {
          label: 'Series 3', // Name the series
          data: [1288,	88942,	44545,	7588,	99,	242,	1417,	5504,	75, 457], // Specify the data values array
          fill: false,
          borderColor: '#4CAF50', // Add custom color border (Line)
          backgroundColor: '#4CAF50', // Add custom color background (Points and Fill)
          borderWidth: 1 // Specify bar border width
      }
      ]
    },
    options: {
      responsive: true, // Instruct chart js to respond nicely.
      maintainAspectRatio: false, // Add to prevent default behaviour of full-width/height 
    }
});
  }

  

  stockChartData = {
    labels: this.date,
    datasets: [
      {
  
        data: this.realdata,
        categoryField: this.date,
        borderColor: '#007bff',
        borderWidth: 2,
        fill: false
      }
    ]
  }

  stockChartOptions = {
    responsive: true,
    maintainAspectRation: false,
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

   chartSet(){
    // var ctx = document.getElementById("lineChart") as HTMLCanvasElement;
    // ctx.getContext("2d")
    // // console.log('ctx', ctx);
    // if(ctx) {
    //   let dataList:any = []
    //   if(this.chartData[0]) {
    //     dataList.push(this.chartData[0])
    //   }
    //   if(this.chartData[1]) {
    //     dataList.push(this.chartData[1])
    //   }
    // }
}
}