import { Component, OnInit, Input, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import * as Chartist from 'chartist';

export interface LegendItem {
  title: string;
  imageClass: string
}

export enum ChartType {
  Pie,
  Line,
  Bar
}

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ChartComponent implements OnInit, AfterViewInit {
  static currentId = 1;
  @Input()
    public title: string;

    @Input()
    public subtitle: string;

    @Input()
    public chartClass: string;

    @Input()
    public chartType: ChartType;

    @Input()
    public chartData: any;

    @Input()
    public chartOptions: any;

    @Input()
    public chartResponsive: any[];

    @Input()
    public footerIconClass: string;

    @Input()
    public footerText: string;

    @Input()
    public legendItems: LegendItem[];

    @Input()
    public withHr: boolean;

    public chartId: string;

  constructor() { }

  ngOnInit() {
    this.chartId = `app-chart-${ChartComponent.currentId++}`;
  }
  ngAfterViewInit(){
    switch (this.chartType) {
     case ChartType.Pie:
       new Chartist.Pie(`#${this.chartId}`, this.chartData, this.chartOptions, this.chartResponsive);
       break;
     case ChartType.Line:
       new Chartist.Line(`#${this.chartId}`, this.chartData, this.chartOptions, this.chartResponsive);
       break;
     case ChartType.Bar:
       new Chartist.Bar(`#${this.chartId}`, this.chartData, this.chartOptions, this.chartResponsive);
       break;
   }
  }

}
