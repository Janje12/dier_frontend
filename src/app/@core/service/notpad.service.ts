import { HttpClient } from '@angular/common/http';
import { NbAuthService } from '@nebular/auth';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { NOtpad, NOtpadData } from '../data/notpad';

@Injectable()
export class NOtpadService extends NOtpadData {
  constructor(private http: HttpClient) {
    super();
  }

  getNOtpad(): Observable<NOtpad[]> {
    return this.http.get<NOtpad[]>('api/otpad');
  }

  updateNOtpad(otpad: NOtpad): Observable<NOtpad> {
    return this.http.patch<NOtpad>('api/otpad', otpad);
  }

}
