import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Delatnost, DelatnostData } from '../data/delatnost';

@Injectable()
export class DelatnostService extends DelatnostData {
  constructor(private http: HttpClient) {
    super();
  }

  getDelatnost(): Observable<Delatnost[]> {
    return this.http.get<Delatnost[]>('/api/delatnost');
  }

  filter(value: string, arr: Delatnost[]): Observable<Delatnost[]> {
    const filterValue = value.toLowerCase();
    if (arr === undefined) return;
    return of(arr.filter(x => x.naziv.toLowerCase().includes(filterValue)));
  }

}

