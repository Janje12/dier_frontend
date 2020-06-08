import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { OOtpad, OOtpadData } from '../data/ootpad';

@Injectable()
export class OOtpadService extends OOtpadData {
  constructor(private http: HttpClient) {
    super();
  }

  getOOtpad(): Observable<OOtpad[]> {
    return this.http.get<OOtpad[]>('api/opasniotpad');
  }

}
