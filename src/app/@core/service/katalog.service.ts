  import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
  import { Delatnost } from '../data/delatnost';
import { Katalog, KatalogData } from '../data/katalog';

@Injectable()
export class KatalogService extends KatalogData {
  constructor(private http: HttpClient) {
    super();
  }

  getKatalog(): Observable<Katalog[]> {
    return this.http.get<Katalog[]>('/api/katalog');
  }

  getNeopasanKatalog(): Observable<Katalog[]> {
    return this.http.get<Katalog[]>('/api/katalog/neopasniOtpad');
  }

  getOpasanKatalog(): Observable<Katalog[]> {
    return this.http.get<Katalog[]>('/api/katalog/opasaniOtpad');
  }

  filter(value: string, arr: Katalog[]): Observable<Katalog[]> {
    const filterValue = value.toLowerCase();
    if (arr === undefined) return;
    return of(arr.filter(x => x.indeksniBroj.toLowerCase().includes(filterValue)));
  }
}
