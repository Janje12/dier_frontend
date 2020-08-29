import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Delatnost, DelatnostData } from '../data/delatnost';

@Injectable()
export class DelatnostService extends DelatnostData {
  private readonly apiUrl: string;
  constructor(private http: HttpClient) {
    super();
    this.apiUrl = environment.apiUrl;
  }

  getDelatnost(): Observable<Delatnost[]> {
    return this.http.get<Delatnost[]>(this.apiUrl + '/api/delatnost');
  }

  filter(value: string, arr: Delatnost[]): Observable<Delatnost[]> {
    const filterValue = value.toLowerCase();
    if (arr === undefined) return;
    return of(arr.filter(x => x.naziv.toLowerCase().includes(filterValue) || x.sifra.includes(filterValue)));
  }

}

