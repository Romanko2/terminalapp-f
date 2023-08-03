import { Component, OnInit } from '@angular/core';
import * as am5 from '@amcharts/amcharts5';
import * as am5stock from '@amcharts/amcharts5/stock';
import * as am5xy from '@amcharts/amcharts5/xy';
import { FormControl } from '@angular/forms';
import { FrontendService } from 'src/app/utils/services/frontend.service';

@Component({
  selector: 'app-stock-chart',
  templateUrl: './stock-chart.component.html',
  styleUrls: ['./stock-chart.component.scss'],
})
export class StockChartComponent implements OnInit {
  timeStamp = new FormControl()
  selectVal: any;
  data = [

  ];

  constructor(private fs: FrontendService) {

  }

  ngOnInit(): void {
    let dataa = {
      symbol: 'TSLA',
      limit: 10,
      offset: 10
    }
    this.fs.getgraph('End_of_Day', dataa).subscribe({
      next: (res: any) => {
        this.data = res.data.data
        console.log(this.data)
        let root = am5.Root.new('chartdiv');
        let data = this.data.map((res: any) => {
          return { ...res, Date: new Date(res.date).getTime() };
        });

        root._logo?.dispose();
        let stockChart = root.container.children.push(
          am5stock.StockChart.new(root, {})
        );
        let mainPanel = stockChart.panels.push(
          am5stock.StockPanel.new(root, {
            panX: true,
            panY: true,
          })
        );
        let valueAxis = mainPanel.yAxes.push(
          am5xy.ValueAxis.new(root, {
            renderer: am5xy.AxisRendererY.new(root, {}),
          })
        );
        let dateAxis = mainPanel.xAxes.push(
          am5xy.GaplessDateAxis.new(root, {
            baseInterval: {
              timeUnit: 'day',
              count: 1,
            },
            groupData: true,
            renderer: am5xy.AxisRendererX.new(root, {}),
          })
        );

        let valueSeries = mainPanel.series.push(
          am5xy.LineSeries.new(root, {
            name: 'High',
            valueXField: 'Date',
            valueYField: 'high',
            xAxis: dateAxis,
            yAxis: valueAxis,
            legendValueText: "{valueY}"
          })
        );

        let valueSeries2 = mainPanel.series.push(
          am5xy.LineSeries.new(root, {
            name: 'Low',
            valueXField: 'Date',
            valueYField: 'low',
            xAxis: dateAxis,
            yAxis: valueAxis,
            legendValueText: "{valueY}"
          })
        );
    // Add the tooltip to the series
          
        let tooltip = am5.Tooltip.new(root, {
          keepTargetHover: true,
          getStrokeFromSprite: true,
          pointerOrientation: "horizontal",
          labelText: "[bold]{name}[/]\n{valueX.formatDate()}: {valueY}",
        });

        valueSeries2.strokes.template.setAll({
          strokeWidth: 2
        });

        valueSeries.set("tooltip", tooltip);
        valueSeries2.set("tooltip", tooltip);

        valueSeries.data.setAll(data);
        valueSeries2.data.setAll(data);
        stockChart.set('stockSeries', valueSeries);
        stockChart.set('stockSeries', valueSeries2);


      }
    })
  }
}