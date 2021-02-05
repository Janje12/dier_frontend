import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Company } from '../data/company';
import { MesecniIzvestaj, MesecniIzvestajData } from '../data/mesecniIzvestaj';
import { Trash } from '../data/trash';
import { Storage } from '../data/storage';

@Injectable()
export class MesecniIzvestajService extends MesecniIzvestajData {
  private readonly apiUrl: string;
  private mesecniIzvestaj$: Observable<MesecniIzvestaj[]>;

  constructor(private http: HttpClient) {
    super();
    this.apiUrl = environment.apiUrl;
  }

  getMesecniIzvestaj(): Observable<MesecniIzvestaj[]> {
    return this.http.get<MesecniIzvestaj[]>(this.apiUrl + '/api/mesecniizvestaj');
  }

  getOneMonthlyReport(reportID: string): Observable<MesecniIzvestaj> {
    return this.http.get<MesecniIzvestaj>(this.apiUrl + '/api/mesecniizvestaj/' + reportID);
  }

  createMesecniIzvestaj(trash: Trash, storage: Storage, reportType): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/pdf');
    return this.http.post(this.apiUrl + '/api/mesecniizvestaj',
      {trash: trash, reportType: reportType, storageID: storage._id}, {headers: headers, responseType: 'blob'});
  }

  createGodisnjiIzvestaj(trash: Trash, reportType: string, company: Company): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/pdf');
    return this.http.post(this.apiUrl + '/api/godisnjiizvestaj',
      {trash: trash, reportType: reportType, company: company}, {headers: headers, responseType: 'blob'});
  }

  getAllMesecniIzvestajFirme(companyID: string): Observable<MesecniIzvestaj[]> {
    if (!this.mesecniIzvestaj$)
      this.mesecniIzvestaj$ = this.http.get<MesecniIzvestaj[]>(this.apiUrl + '/api/mesecniizvestaj/firma/' + companyID);
    return this.mesecniIzvestaj$;
  }
}
