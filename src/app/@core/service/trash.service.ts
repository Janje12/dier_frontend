import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Trash, TrashData } from '../data/trash';

@Injectable()
export class TrashService extends TrashData {
  private readonly apiUrl: string;

  constructor(private http: HttpClient) {
    super();
    this.apiUrl = environment.apiUrl;
  }

  createTrash(trash: Trash, storageID: string): Observable<Trash> {
    return this.http.post<Trash>(this.apiUrl + '/api/trash', {trash: trash, storageID: storageID});
  }

  deleteTrash(storageID: string, value: string, type: string = '_id'): Observable<Trash> {
    return this.http.delete<Trash>(this.apiUrl + '/api/trash/one/' + `${type}/${value}/${storageID}`);
  }

  getTrash(value: string, type: string = '_id'): Observable<Trash> {
    return this.http.get<Trash>(this.apiUrl + '/api/trash/one/' + `${type}/${value}`);
  }

  getTrashes(value: string, type: string): Observable<Trash[]> {
    return this.http.get<Trash[]>(this.apiUrl + '/api/trash/many/' + `${type}/${value}`);
  }

  updateTrash(trash: Trash, storageID: string, value: string, type: string = '_id',
              companyName?: string, documentNo?: string): Observable<Trash> {
    return this.http.patch<Trash>(this.apiUrl + '/api/trash/one/' + `${type}/${value}`,
      {trash: trash, storageID: storageID, documentNo: documentNo, companyName: companyName});
  }

}
