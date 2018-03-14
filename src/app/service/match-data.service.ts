import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class MatchDataService {
  private match_url = 'assets/matches.json';
  tosscount = 0;
  constructor(private http: Http) { }
  getData(){
    return this.http.get(this.match_url)
      .map((res: Response) => {
        const data = res.json();
        return data;
      });
  }
  // getLength(){
  //   return this.http.get(this.match_url)
  //     .map((res: Response) => {
  //       const data = res.json();
  //       for(const i of data){
  //         if(i.toss_winner === i.winner){
  //           // console.log(i.id);
  //           // console.log(this.tosscount++);
  //           return this.tosscount++;
  //         }
  //       }
  //       return this.tosscount;
  //     });
  // }

}
