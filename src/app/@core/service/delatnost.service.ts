import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Delatnost, DelatnostData } from '../data/delatnost';

@Injectable()
export class DelatnostService extends DelatnostData {
  constructor(private http: HttpClient) {
    super();
  }

  getDelatnost(): Observable<Delatnost[]> {
    return this.http.get<Delatnost[]>('/api/delatnost');
  }

}

