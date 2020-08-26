import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NbAuthService } from '@nebular/auth';
import { Observable } from 'rxjs';
import { Firma, FirmaData } from '../data/firma';

@Injectable()
export class FirmaService extends FirmaData {
  constructor(private http: HttpClient, private authService: NbAuthService) {
    super();
  }

  getFirma(): Observable<Firma[]> {
    return this.http.get<Firma[]>('api/firma');
  }

}

