import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NbAuthService } from '@nebular/auth';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Firma, FirmaData } from '../data/firma';

@Injectable()
export class FirmaService extends FirmaData {
  private readonly apiUrl: string;
  constructor(private http: HttpClient, private authService: NbAuthService) {
    super();
    this.apiUrl = environment.apiUrl;
  }

  getFirma(): Observable<Firma[]> {
    return this.http.get<Firma[]>(this.apiUrl + '/api/firma');
  }

}

