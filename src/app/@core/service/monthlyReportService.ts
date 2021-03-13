import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Company } from '../data/company';
import { MonthlyReportData, MonthlyReport} from '../data/monthlyReport';
import { Trash } from '../data/trash';
import { Storage } from '../data/storage';

@Injectable()
export class MonthlyReportService extends MonthlyReportData {
  private readonly apiUrl: string;
  private mesecniIzvestaj$: Observable<MonthlyReport[]>;

  constructor(private http: HttpClient) {
    super();
    this.apiUrl = environment.apiUrl;
  }

  getMonthlyReport(): Observable<MonthlyReport[]> {
    return this.http.get<MonthlyReport[]>(this.apiUrl + '/api/mesecniizvestaj');
  }

  getOneMonthlyReport(reportID: string): Observable<MonthlyReport> {
    return this.http.get<MonthlyReport>(this.apiUrl + '/api/mesecniizvestaj/' + reportID);
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

  getAllMesecniIzvestajFirme(companyID: string): Observable<MonthlyReport[]> {
    if (!this.mesecniIzvestaj$)
      this.mesecniIzvestaj$ = this.http.get<MonthlyReport[]>(this.apiUrl + '/api/mesecniizvestaj/firma/' + companyID);
    return this.mesecniIzvestaj$;
  }
}
