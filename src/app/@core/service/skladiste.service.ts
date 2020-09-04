import { HttpClient } from '@angular/common/http';
import { NbAuthService } from '@nebular/auth';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
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
    return this.http.get<Skladiste[]>(this.apiUrl + '/api/skladiste');
  }

  getOneSkladiste(id: string): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/api/skladiste/' + id);
  }

  findSkladiste(type: string, value: string): Observable<Skladiste> {
    return this.http.get<Skladiste>(this.apiUrl + '/api/skladiste/' + type + '/' + value);
  }

  createSkladiste(skladiste: Skladiste): Observable<Skladiste> {
    return this.http.post<Skladiste>(this.apiUrl + '/api/skladiste/' + skladiste._id, skladiste);
  }

  updateSkladiste(skladiste: Skladiste): Observable<Skladiste> {
    return this.http.patch<Skladiste>(this.apiUrl + '/api/skladiste/' + skladiste._id, skladiste);
  }

  deleteSkladiste(skladiste: Skladiste): Observable<Skladiste> {
    return this.http.delete<Skladiste>(this.apiUrl + '/api/skladiste/' + skladiste._id);
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
