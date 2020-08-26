import { HttpClient } from '@angular/common/http';
import { NbAuthService } from '@nebular/auth';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Skladiste, SkladisteData } from '../data/skladiste';
import { SkladisteTretman } from '../data/skladisteTretman';

@Injectable()
export class SkladisteService extends SkladisteData {
  constructor(private http: HttpClient, private authService: NbAuthService) {
    super();
  }

  getSkladiste(): Observable<Skladiste[]> {
    return undefined;
  }

  getSkladisteFirme(): Observable<Skladiste[]> {
    let firmaID = '';
    this.authService.getToken().subscribe(x => {
      firmaID = x.getPayload().data.firma._id;
    });
    return this.http.get<Skladiste[]>('api/skladiste/firma/' + firmaID);
  }

  getSkladisteTretmanFirme(): Observable<SkladisteTretman[]> {
    let firmaID = '';
    this.authService.getToken().subscribe(x => {
      firmaID = x.getPayload().data.firma._id;
    });
    return this.http.get<SkladisteTretman[]>('api/skladistetretman/firma/' + firmaID);
  }

}
