import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { NOtpad, NOtpadData } from '../data/notpad';

@Injectable()
export class NOtpadService extends NOtpadData {
  private readonly apiUrl: string;

  constructor(private http: HttpClient) {
    super();
    this.apiUrl = environment.apiUrl;
  }

  getNOtpad(): Observable<NOtpad[]> {
    return this.http.get<NOtpad[]>(this.apiUrl + '/api/otpad');
  }

  dodajNOtpad(otpad: NOtpad, skladisteID: string): Observable<NOtpad> {
    return this.http.post<NOtpad>(this.apiUrl + '/api/otpad', {otpad: otpad, skladiste: skladisteID});
  }

  updateNOtpad(otpad: NOtpad, skladisteID: string): Observable<NOtpad> {
    return this.http.patch<NOtpad>(this.apiUrl + '/api/otpad/' + otpad._id, {otpad: otpad, skladiste: skladisteID});
  }

}
