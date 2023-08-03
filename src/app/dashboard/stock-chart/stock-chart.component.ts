import { Component, OnInit } from '@angular/core';
import * as am5 from '@amcharts/amcharts5';
import * as am5stock from '@amcharts/amcharts5/stock';
import * as am5xy from '@amcharts/amcharts5/xy';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-stock-chart',
  templateUrl: './stock-chart.component.html',
  styleUrls: ['./stock-chart.component.scss'],
})
export class StockChartComponent implements OnInit {
  timeStamp = new FormControl()
  data = [
    {
      open: 290.15,
      high: 295.26,
      low: 286.01,
      close: 293.34,
      volume: 112434713,
      adj_high: 295.26,
      adj_low: 286.01,
      adj_close: 293.34,
      adj_open: 290.15,
      adj_volume: 112434713,
      split_factor: 1,
      dividend: 0,
      symbol: 'TSLA',
      exchange: 'XNAS',
      date: '2023-07-18T00:00:00+0000',
    },
    {
      open: 286.625,
      high: 292.23,
      low: 283.57,
      close: 290.38,
      volume: 131569593,
      adj_high: 292.23,
      adj_low: 283.57,
      adj_close: 290.38,
      adj_open: 286.625,
      adj_volume: 131569593,
      split_factor: 1,
      dividend: 0,
      symbol: 'TSLA',
      exchange: 'XNAS',
      date: '2023-07-17T00:00:00+0000',
    },
    {
      open: 277.01,
      high: 285.3,
      low: 276.31,
      close: 281.38,
      volume: 120062369,
      adj_high: 285.3,
      adj_low: 276.31,
      adj_close: 281.38,
      adj_open: 277.01,
      adj_volume: 120062369,
      split_factor: 1,
      dividend: 0,
      symbol: 'TSLA',
      exchange: 'XNAS',
      date: '2023-07-14T00:00:00+0000',
    },
    {
      open: 274.59,
      high: 279.45,
      low: 270.6,
      close: 277.9,
      volume: 112681458,
      adj_high: 279.45,
      adj_low: 270.6,
      adj_close: 277.9,
      adj_open: 274.59,
      adj_volume: 112681458,
      split_factor: 1,
      dividend: 0,
      symbol: 'TSLA',
      exchange: 'XNAS',
      date: '2023-07-13T00:00:00+0000',
    },
    {
      open: 276.325,
      high: 276.52,
      low: 271.46,
      close: 271.99,
      volume: 95672139,
      adj_high: 276.52,
      adj_low: 271.46,
      adj_close: 271.99,
      adj_open: 276.325,
      adj_volume: 95672139,
      split_factor: 1,
      dividend: 0,
      symbol: 'TSLA',
      exchange: 'XNAS',
      date: '2023-07-12T00:00:00+0000',
    },
    {
      open: 268.65,
      high: 270.9,
      low: 266.37,
      close: 269.79,
      volume: 91972358,
      adj_high: 270.9,
      adj_low: 266.37,
      adj_close: 269.79,
      adj_open: 268.65,
      adj_volume: 91972358,
      split_factor: 1,
      dividend: 0,
      symbol: 'TSLA',
      exchange: 'XNAS',
      date: '2023-07-11T00:00:00+0000',
    },
    {
      open: 276.47,
      high: 277.52,
      low: 265.1,
      close: 269.61,
      volume: 119425405,
      adj_high: 277.52,
      adj_low: 265.1,
      adj_close: 269.61,
      adj_open: 276.47,
      adj_volume: 119425405,
      split_factor: 1,
      dividend: 0,
      symbol: 'TSLA',
      exchange: 'XNAS',
      date: '2023-07-10T00:00:00+0000',
    },
    {
      open: 278.43,
      high: 280.78,
      low: 273.77,
      close: 274.43,
      volume: 113879174,
      adj_high: 280.78,
      adj_low: 273.77,
      adj_close: 274.43,
      adj_open: 278.43,
      adj_volume: 113879174,
      split_factor: 1,
      dividend: 0,
      symbol: 'TSLA',
      exchange: 'XNAS',
      date: '2023-07-07T00:00:00+0000',
    },
    {
      open: 278.09,
      high: 279.97,
      low: 272.88,
      close: 276.54,
      volume: 120707419,
      adj_high: 279.97,
      adj_low: 272.88,
      adj_close: 276.54,
      adj_open: 278.09,
      adj_volume: 120707419,
      split_factor: 1,
      dividend: 0,
      symbol: 'TSLA',
      exchange: 'XNAS',
      date: '2023-07-06T00:00:00+0000',
    },
    {
      open: 278.82,
      high: 283.85,
      low: 277.6,
      close: 282.48,
      volume: 131530862,
      adj_high: 283.85,
      adj_low: 277.6,
      adj_close: 282.48,
      adj_open: 278.82,
      adj_volume: 131530862,
      split_factor: 1,
      dividend: 0,
      symbol: 'TSLA',
      exchange: 'XNAS',
      date: '2023-07-05T00:00:00+0000',
    },
  ];

  constructor() { 
    this.timeStamp.valueChanges.subscribe((res)=>{
      console.log("res)")
    })
  }

  ngOnInit(): void {
    let root = am5.Root.new('chartdiv');

    let data = this.data.map((res) => {
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


    var tooltip = am5.Tooltip.new(root, {
      getStrokeFromSprite: true,
      labelText: "[bold]{name}[/]\n{valueX.formatDate()}: {valueY}",
    });

    valueSeries.set("tooltip", tooltip);
    valueSeries2.set("tooltip", tooltip);

    valueSeries.data.setAll(data);
    valueSeries2.data.setAll(data);
    stockChart.set('stockSeries', valueSeries);
    stockChart.set('stockSeries', valueSeries2);
  }
}