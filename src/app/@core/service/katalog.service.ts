  import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
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
    return this.http.get<Katalog[]>('/api/katalog/neopasan');
  }

}
