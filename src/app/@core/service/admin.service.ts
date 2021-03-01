import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Company } from '../data/company';
import { Permit } from '../data/permit';
import { Storage } from '../data/storage';
import { User } from '../data/user';

@Injectable()
export class AdminService {
  private readonly apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  getUser(value: string, type: string = '_id'): Observable<User> {
    return this.http.get<User>(this.apiUrl + '/api/admin/users/one/' + `${type}/${value}`);
  }

  getUsers(value: string = 'all', type: string = '_id'): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl + '/api/admin/users/many/' + `${type}/${value}`);
  }

  getCompany(value: string, type: string = '_id'): Observable<Company> {
    return this.http.get<Company>(this.apiUrl + '/api/admin/companies/one/' + `${type}/${value}`);
  }

  getCompanies(value: string = 'all', type: string = '_id'): Observable<Company[]> {
    return this.http.get<Company[]>(this.apiUrl + '/api/admin/companies/many/' + `${type}/${value}`);
  }

  getStorage(value: string, type: string = '_id'): Observable<Storage> {
    return this.http.get<Storage>(this.apiUrl + '/api/admin/storages/one/' + `${type}/${value}`);
  }

  getStorages(value: string = 'all', type: string = '_id'): Observable<Storage[]> {
    return this.http.get<Storage[]>(this.apiUrl + '/api/admin/storages/many/' + `${type}/${value}`);
  }

  getPermit(value: string, type: string = '_id'): Observable<Permit> {
    return this.http.get<Permit>(this.apiUrl + '/api/admin/permits/one/' + `${type}/${value}`);
  }

  getPermits(value: string = 'all', type: string = '_id'): Observable<Permit[]> {
    return this.http.get<Permit[]>(this.apiUrl + '/api/admin/permits/many/' + `${type}/${value}`);
  }

  getCompanyNames(value: string = 'all'): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + '/api/admin/companies/storages/' + value);
  }
}
