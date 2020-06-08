import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Mesto, MestoData } from '../data/mesto';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MestoService extends MestoData {
  constructor(private http: HttpClient) {
    super();
  }

  getMesto(): Observable<Mesto[]> {
    return this.http.get<Mesto[]>('/api/mesto');
  }

  getOpstine(): Observable<any> {
    return this.http.get<any>('api/mesto/opstine');
  }

  getNazivMesta(nazivOpstine: string): Observable<any> {
    return this.http.get<any>('api/mesto/mesta/' + nazivOpstine);
  }

}
