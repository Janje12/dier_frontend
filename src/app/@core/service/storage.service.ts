import { HttpClient } from '@angular/common/http';
import { NbAuthService } from '@nebular/auth';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Storage, StorageData } from '../data/storage';

@Injectable()
export class StorageService extends StorageData {
  private readonly apiUrl: string;

  constructor(private http: HttpClient, private authService: NbAuthService) {
    super();
    this.apiUrl = environment.apiUrl;
  }

  createStorage(storage: Storage): Observable<Storage> {
    return this.http.post<Storage>(this.apiUrl + '/api/storage', storage);
  }

  deleteStorage(value: string, type: string = '_id'): Observable<Storage> {
    return this.http.delete<Storage>(this.apiUrl + '/api/storage/one/' + `${type}/${value}`);
  }

  getStorage(value: string, type: string = '_id'): Observable<Storage> {
    return this.http.get<Storage>(this.apiUrl + '/api/storage/one/' + `${type}/${value}`);
  }

  getStorages(value: string, type: string): Observable<Storage[]> {
    return this.http.get<Storage[]>(this.apiUrl + '/api/storage/many/' + `${type}/${value}`);
  }

  updateStorage(storage: Storage, value: string, type: string = '_id'): Observable<Storage> {
    return this.http.patch<Storage>(this.apiUrl + '/api/storage/one/' + `${type}/${value}`, storage);
  }

  getCompaniesStorage(companyID: string, storageType: string = 'all'): Observable<Storage[]> {
    return this.http.get<Storage[]>(this.apiUrl + '/api/company/storages/' + `${companyID}/${storageType}`);
  }

}
