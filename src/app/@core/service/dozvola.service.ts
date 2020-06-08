import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Dozvola, DozvolaData } from '../data/dozvola';

@Injectable()
export class DozvolaService extends DozvolaData {
  constructor(private http: HttpClient) {
    super();
  }

  getDozvola(): Observable<Dozvola[]> {
    return this.http.get<Dozvola[]>('api/dozvola');
  }

}

