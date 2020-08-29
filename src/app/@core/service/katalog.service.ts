import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Katalog, KatalogData } from '../data/katalog';

@Injectable()
export class KatalogService extends KatalogData {
  private readonly apiUrl: string;

  constructor(private http: HttpClient) {
    super();
    this.apiUrl = environment.apiUrl;
  }

  getKatalog(): Observable<Katalog[]> {
    return this.http.get<Katalog[]>(this.apiUrl + '/api/katalog');
  }

  getNeopasanKatalog(): Observable<Katalog[]> {
    return this.http.get<Katalog[]>(this.apiUrl + '/api/katalog/neopasniOtpad');
  }

  getOpasanKatalog(): Observable<Katalog[]> {
    return this.http.get<Katalog[]>(this.apiUrl + '/api/katalog/opasaniOtpad');
  }

  filter(value: string, arr: Katalog[]): Observable<Katalog[]> {
    const filterValue = value.toLowerCase();
    if (arr === undefined) return;
    return of(arr.filter(x => x.indeksniBroj.toLowerCase().includes(filterValue)));
  }
}
