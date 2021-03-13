import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NbAuthService } from '@nebular/auth';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Permit, PermitData } from '../data/permit';

@Injectable()
export class PermitService extends PermitData {
  private readonly apiUrl: string;

  constructor(private http: HttpClient) {
    super();
    this.apiUrl = environment.apiUrl;
  }

  createPermit(permit: Permit, companyID: string): Observable<Permit> {
    return this.http.post<Permit>(this.apiUrl + '/api/permit', {permit: permit, companyID: companyID});
  }

  deletePermit(value: string, type: string = '_id'): Observable<Permit> {
    return this.http.delete<Permit>(this.apiUrl + '/api/permit/one/' + `${type}/${value}`);
  }

  getPermit(value: string, type: string = '_id'): Observable<Permit> {
    return this.http.get<Permit>(this.apiUrl + '/api/permit/one/' + `${type}/${value}`);
  }

  getPermits(value: string = 'all', type: string): Observable<Permit[]> {
    return this.http.get<Permit[]>(this.apiUrl + '/api/permit/many/' + `${type}/${value}`);
  }

  updatePermit(permit: Permit, value: string, type: string = '_id'): Observable<Permit> {
    return this.http.patch<Permit>(this.apiUrl + '/api/permit/one/' + `${type}/${value}`, permit);
  }

  getCompaniesPermits(companyID: string, permitType: string = 'all'): Observable<Permit[]> {
    return this.http.get<Permit[]>(this.apiUrl + '/api/company/permits/' + companyID + '/' + permitType);
  }
}

