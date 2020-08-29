import { HttpClient } from '@angular/common/http';
import { NbAuthService } from '@nebular/auth';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Skladiste, SkladisteData } from '../data/skladiste';
import { SkladisteTretman } from '../data/skladisteTretman';

@Injectable()
export class SkladisteService extends SkladisteData {
  private readonly apiUrl: string;

  constructor(private http: HttpClient, private authService: NbAuthService) {
    super();
    this.apiUrl = environment.apiUrl;
  }

  getSkladiste(): Observable<Skladiste[]> {
    return undefined;
  }

  getSkladisteFirme(): Observable<Skladiste[]> {
    let firmaID = '';
    this.authService.getToken().subscribe(x => {
      firmaID = x.getPayload().data.firma._id;
    });
    return this.http.get<Skladiste[]>(this.apiUrl + '/api/skladiste/firma/' + firmaID);
  }

  getSkladisteTretmanFirme(): Observable<SkladisteTretman[]> {
    let firmaID = '';
    this.authService.getToken().subscribe(x => {
      firmaID = x.getPayload().data.firma._id;
    });
    return this.http.get<SkladisteTretman[]>(this.apiUrl + '/api/skladistetretman/firma/' + firmaID);
  }

}
