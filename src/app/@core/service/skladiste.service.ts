import { HttpClient } from '@angular/common/http';
import { NbAuthService } from '@nebular/auth';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { NOtpad } from '../data/notpad';
import { Skladiste, SkladisteData } from '../data/skladiste';
import { SkladisteDeponija } from '../data/skladisteDeponija';
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

  updateSkladiste(skladiste: Skladiste): Observable<Skladiste> {
    return this.http.patch<Skladiste>(this.apiUrl + '/api/skladiste/' + skladiste._id, skladiste);
  }

  getAllSkladistaFirme(): Observable<Skladiste[]> {
    let firmaID = '';
    this.authService.getToken().subscribe(x => {
      firmaID = x.getPayload().data.firma._id;
    });
    return this.http.get<Skladiste[]>(this.apiUrl + '/api/skladiste/firma/skladisteAll/' + firmaID);
  }

  getSkladisteFirme(): Observable<Skladiste[]> {
    let firmaID = '';
    this.authService.getToken().subscribe(x => {
      firmaID = x.getPayload().data.firma._id;
    });
    return this.http.get<Skladiste[]>(this.apiUrl + '/api/skladiste/firma/' + firmaID);
  }

  getSkladisteSkladistenjeFirme(): Observable<Skladiste[]> {
    let firmaID = '';
    this.authService.getToken().subscribe(x => {
      firmaID = x.getPayload().data.firma._id;
    });
    return this.http.get<Skladiste[]>(this.apiUrl + '/api/skladiste/firma/skladiste/' + firmaID);
  }

  getSkladisteTretmanFirme(): Observable<SkladisteTretman[]> {
    let firmaID = '';
    this.authService.getToken().subscribe(x => {
      firmaID = x.getPayload().data.firma._id;
    });
    return this.http.get<SkladisteTretman[]>(this.apiUrl + '/api/skladistetretman/firma/' + firmaID);
  }

  getSkladisteDeponijaFirme(): Observable<SkladisteDeponija[]> {
    let firmaID = '';
    this.authService.getToken().subscribe(x => {
      firmaID = x.getPayload().data.firma._id;
    });
    return this.http.get<SkladisteDeponija[]>(this.apiUrl + '/api/skladistedeponija/firma/' + firmaID);
  }

}
