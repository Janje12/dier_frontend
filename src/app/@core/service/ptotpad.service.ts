import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { PTOtpad, PTOtpadData } from '../data/ptotpad';

@Injectable()
export class PTOtpadService extends PTOtpadData {
  constructor(private http: HttpClient) {
    super();
  }

  getPTOtpad(): Observable<PTOtpad[]> {
    return this.http.get<PTOtpad[]>('api/posebnitokoviotpada');
  }

}
