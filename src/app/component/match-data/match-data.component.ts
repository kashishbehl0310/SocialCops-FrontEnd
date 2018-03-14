import { Component, OnInit } from '@angular/core';

import * as data from '../../matches.json';
import { MatchDataService } from '../../service/match-data.service';
import { LegendItem, ChartType } from '../chart/chart.component';
// import { G2values } from './match-data.model';

@Component({
  selector: 'app-match-data',
  templateUrl: './match-data.component.html',
  styleUrls: ['./match-data.component.css']
})

export class MatchDataComponent implements OnInit {
  // g2values = new G2values();
  // batwins = this.g2values.batwins;
  matchData = [];
  length = (<any>data).length;
  flags = [];
  teams = [];
  flags2 = [];
  stadiums = [];
  g1labels = [];
  g1values = [];
  g2labels = [];
  // g2values: {}[];
  // g2values = {"batwins": [],"fieldwins":[], "ties":[]};
  // graphArray = Array.from(this.g2values);
  // res = [];
  batwins = [];
  fieldwins = [];
  ties = [];
  tosscount = 0;
  battoss = 0;
  fieldtoss = 0;
  flipcard1 = false;
  flipped2 = false;
  flipped3 = false;
  l = 0;
  label = ['70%', '20%', '5%', '5%'];
  data = [];
  public winChartType: ChartType;
  public winChartData: any;
  public statChartType: ChartType;
  public statChartData: any;
  constructor(private matchdataservice: MatchDataService) { }

  ngOnInit() {
    for(const i of (<any>data)){
      if(i.toss_winner === i.winner) {
        this.tosscount++;
        if (i.toss_decision === 'bat') {
            this.battoss++;
        }
        else if(i.toss_decision === 'field') {
            this.fieldtoss++;
        }
      }
      if(this.flags[i.team1]){
        continue;
      }
      this.flags[i.team1] = true;
      this.teams.push({name: i.team1, wins: 0})
    }
    for(const i of (<any>data)){
      if(this.flags2[i.venue]) {
        continue;
      }
      this.flags2[i.venue] = true;
      this.stadiums.push({name: i.venue, batwins: 0, fieldwins: 0, ties: 0})
    }
    // console.log(this.stadiums);
    for(const i of(<any>data)){
      for(let j =0, jlen = this.teams.length; j < jlen; j++){
        if(this.teams[j].name === i.winner){
          this.teams[j].wins++;
        }
      }
      for(let k =0, klen = this.stadiums.length; k < klen; k++){
        if(i.result === 'normal'){
          if(i.venue === this.stadiums[k].name){
            if(i.toss_decision === 'bat') {
              this.stadiums[k].batwins++;
            }
            else if(i.toss_decision === 'field'){
              this.stadiums[k].fieldwins++;
            }
          }
        }
        if(i.result === 'tie') {
          if(i.venue === this.stadiums[k].name){
            this.stadiums[k].ties++;
          }
        }
      }
    }
    for (let i = 0, j = this.teams.length; i < j; i++) {
        this.g1labels.push(this.teams[i].name);
        this.g1values.push(this.teams[i].wins);
    }
    for(let i =0, j = this.stadiums.length; i < j; i++) {
      this.g2labels.push(this.stadiums[i].name);
      this.batwins.push(this.stadiums[i].batwins);
      this.fieldwins.push(this.stadiums[i].fieldwins);
      this.ties.push(this.stadiums[i].ties);
      // console.log(this.g2values.fieldwins);
      // console.log(k);
    }
    // console.log(this.batwins);
    // this.res = Object.keys(this.g2values)
    //   .map(function(k) {
    //     return[+k, this.g2values[k]];
    //   });
    //   console.log(this.res);
   this.matchdataservice.getData()
      .subscribe(resData => this.matchData = resData);

  // this.count =  this.matchdataservice.getTossCount()
  //     .subscribe(res => this.data = res);
  console.log(this.g2labels.length);
      this.winChartType = ChartType.Line;
      this.label = this.g1labels;
      this.data = this.g1values;
       this.winChartData = {
         labels: this.label,
         series: [this.g1values]
       };
       this.statChartType = ChartType.Bar;
       this.statChartData = {
         labels: this.g2labels,
         series: [
           this.batwins,
           this.fieldwins,
           this.ties
         ]
       }
       // this.emailChartLegendItems = [
       //   { title: 'Open', imageClass: 'fa fa-circle text-info' },
       //   { title: 'Bounce', imageClass: 'fa fa-circle text-danger' },
       //   { title: 'Unsubscribe', imageClass: 'fa fa-circle text-warning' }
       // ];
  }
}
