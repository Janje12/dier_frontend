import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NbAuthService } from '@nebular/auth';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Dozvola, DozvolaData } from '../data/dozvola';

@Injectable()
export class DozvolaService extends DozvolaData {
  private readonly apiUrl: string;

  constructor(private http: HttpClient, private authService: NbAuthService) {
    super();
    this.apiUrl = environment.apiUrl;
  }

  getDozvola(): Observable<Dozvola[]> {
    return this.http.get<Dozvola[]>(this.apiUrl + '/api/dozvola');
  }

  updateDozvola(dozvola: Dozvola): Observable<Dozvola> {
    return this.http.patch<Dozvola>(this.apiUrl + '/api/dozvola/' + dozvola._id, dozvola);
  }

  getDozvolaFrime(): Observable<Dozvola[]> {
    let firmaID = '';
    this.authService.getToken().subscribe(x => {
      firmaID = x.getPayload().data.firma._id;
    });
    return this.http.get<Dozvola[]>(this.apiUrl + '/api/dozvola/firma/' + firmaID);
  }
}

