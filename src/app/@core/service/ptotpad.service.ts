import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { PTOtpad, PTOtpadData } from '../data/ptotpad';

@Injectable()
export class PTOtpadService extends PTOtpadData {
  private readonly apiUrl: string;
  constructor(private http: HttpClient) {
    super();
    this.apiUrl = environment.apiUrl;
  }

  getPTOtpad(): Observable<PTOtpad[]> {
    return this.http.get<PTOtpad[]>(this.apiUrl + '/api/posebnitokoviotpada');
  }

}
