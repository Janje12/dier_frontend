import { Injectable } from '@angular/core';
import { AOtpad, AOtpadData } from '../data/aotpad';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';

@Injectable()
export class AOtpadService extends AOtpadData {
  constructor(private http: HttpClient) {
    super();
  }

  getAOtpad(): Observable<AOtpad[]> {
    return this.http.get<AOtpad[]>('api/ambalazniotpad');
  }

}

