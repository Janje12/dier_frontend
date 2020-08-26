import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NbAuthService } from '@nebular/auth';
import { Observable } from 'rxjs';
import { Dozvola, DozvolaData } from '../data/dozvola';

@Injectable()
export class DozvolaService extends DozvolaData {
  constructor(private http: HttpClient, private authService: NbAuthService) {
    super();
  }

  getDozvola(): Observable<Dozvola[]> {
    return this.http.get<Dozvola[]>('api/dozvola');
  }

  getDozvolaFrime(): Observable<Dozvola[]> {
    let firmaID = '';
    this.authService.getToken().subscribe(x => {
      firmaID = x.getPayload().data.firma._id;
    });
    return this.http.get<Dozvola[]>('api/dozvola/firma/' + firmaID);
  }
}

