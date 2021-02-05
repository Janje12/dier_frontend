import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NbAuthService } from '@nebular/auth';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Company, CompanyData } from '../data/company';

@Injectable()
export class CompanyService extends CompanyData {
  private readonly apiUrl: string;
  constructor(private http: HttpClient, private authService: NbAuthService) {
    super();
    this.apiUrl = environment.apiUrl;
  }

  createCompany(company: Company): Observable<Company> {
    return this.http.post<Company>(this.apiUrl + '/api/company', company);
  }

  deleteCompany(value: string, type: string = '_id'): Observable<Company> {
    return this.http.delete<Company>(this.apiUrl + '/api/company/one/' + `${type}/${value}`);
  }

  getCompany(value: string, type: string = '_id'): Observable<Company> {
    return this.http.get<Company>(this.apiUrl + '/api/company/one/' + `${type}/${value}`);
  }

  getCompanys(value: string = 'all', type: string): Observable<Company[]> {
    return this.http.get<Company[]>(this.apiUrl + '/api/company/many/' + `${type}/${value}`);
  }

  updateCompany(company: Company, value: string, type: string = '_id'): Observable<Company> {
    return this.http.patch<Company>(this.apiUrl + '/api/company/one/' + `${type}/${value}`, company);
  }

}

