import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Occupation, OccupationData } from '../data/occupation';

@Injectable()
export class OccupationService extends OccupationData {
  private readonly apiUrl: string;
  constructor(private http: HttpClient) {
    super();
    this.apiUrl = environment.apiUrl;
  }

  createOccupation(occupation: Occupation): Observable<Occupation> {
    return undefined;
  }

  deleteOccupation(value: string, type?: string): Observable<Occupation> {
    return undefined;
  }

  getOccupation(value: string = '', type: string = '_id'): Observable<Occupation> {
    return this.http.get<Occupation>(this.apiUrl + '/api/occupation/one/' + `${type}/${value}`);
  }

  getOccupations(value: string = 'all', type: string = '_id'): Observable<Occupation[]> {
    return this.http.get<Occupation[]>(this.apiUrl + '/api/occupation/many/' + `${type}/${value}`);
  }

  updateOccupation(occupation: Occupation, value: string, type: string = '_id'): Observable<Occupation> {
    return this.http.patch<Occupation>(this.apiUrl + '/api/occupation/one/' + `${type}/${value}`, occupation);
  }

  filter(value: string, arr: Occupation[]): Observable<Occupation[]> {
    const filterValue = value.toLowerCase();
    if (arr === undefined) return;
    return of(arr.filter(x => x.name.toLowerCase().includes(filterValue) || x.code.includes(filterValue)));
  }

}

