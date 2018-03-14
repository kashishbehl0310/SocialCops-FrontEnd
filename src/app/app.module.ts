import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ChartsModule } from 'ng2-charts';


import { AppComponent } from './app.component';
import { MatchDataComponent } from './component/match-data/match-data.component';
import { MatchDataService } from './service/match-data.service';
import { ChartComponent } from './component/chart/chart.component';

@NgModule({
  declarations: [
    AppComponent,
    MatchDataComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ChartsModule
  ],
  providers: [MatchDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
