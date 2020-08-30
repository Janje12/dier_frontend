import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Mesto, MestoData } from '../data/mesto';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MestoService extends MestoData {
  private readonly apiUrl: string;

  constructor(private http: HttpClient) {
    super();
    this.apiUrl = environment.apiUrl;
  }

  getMesto(): Observable<Mesto[]> {
    return this.http.get<Mesto[]>(this.apiUrl + '/api/mesto');
  }

  getOpstine(): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/api/mesto/opstine');
  }

  getNazivMesta(nazivOpstine: string): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/api/mesto/mesta/' + nazivOpstine);
  }

  filter(value: string, arr: string[]): Observable<string[]> {
    const filterValue = value.toLowerCase();
    if (arr === undefined) return;
    return of(arr.filter(x => x.toLowerCase().includes(filterValue)));
  }

}
