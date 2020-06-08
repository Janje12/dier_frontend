import { Ambalaza, AmbalazaData } from '../data/ambalaza';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable()
export class AmblazaService extends AmbalazaData {
  constructor(private http: HttpClient) {
    super();
  }

  getAmbalaza(): Observable<Ambalaza[]> {
    return this.http.get<Ambalaza[]>('api/ambalaza');
  }

  getVrsteAmbalaza(): Observable<string[]> {
    const vrsteAmbalaza: string[] = ['PET', 'Staklo', 'Druga vrsta plastike', 'Gvožđe', 'Aluminijum',
      'Palete', 'Ostalo Drvo', 'Tekstil', 'Keramika', 'Druge vrste ambalaže'];
    return of(vrsteAmbalaza);
  }

}
