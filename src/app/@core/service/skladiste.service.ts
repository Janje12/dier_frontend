import { HttpClient } from '@angular/common/http';
import { NbAuthService } from '@nebular/auth';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { NOtpad } from '../data/notpad';
import { Skladiste, SkladisteData } from '../data/skladiste';

@Injectable()
export class SkladisteService extends SkladisteData {
  constructor(private http: HttpClient, private authService: NbAuthService) {
    super();
  }

  getSkladiste(): Observable<Skladiste> {
    let skladisteID = '';
    this.authService.getToken().subscribe(x => {
      skladisteID = x.getPayload().data.skladiste[0];
    });
    return this.http.get<Skladiste>('api/skladiste/' + skladisteID);
  }

  dodajOtpad(notpad: NOtpad): Observable<NOtpad> {
    let skladisteID = '';
    this.authService.getToken().subscribe(x => {
      skladisteID = x.getPayload().data.skladiste[0];
    });
    return this.http.post<NOtpad>('api/skladiste', {otpad: notpad, skladiste: skladisteID});
  }

}
