import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { OOtpad, OOtpadData } from '../data/ootpad';

@Injectable()
export class OOtpadService extends OOtpadData {
  private readonly apiUrl: string;
  constructor(private http: HttpClient) {
    super();
    this.apiUrl = environment.apiUrl;
  }

  getOOtpad(): Observable<OOtpad[]> {
    return this.http.get<OOtpad[]>(this.apiUrl + '/api/opasniotpad');
  }

  dodajOOtpad(otpad: OOtpad, skladisteID: string): Observable<OOtpad> {
    return this.http.post<OOtpad>(this.apiUrl + '/api/opasniotpad', {otpad: otpad, skladiste: skladisteID});
  }

}
