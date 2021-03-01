import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { SpecialWaste, SpecialWasteData } from '../data/specialWaste';
import { Storage } from '../data/storage';

@Injectable()
export class SpecialWasteService extends SpecialWasteData {
  private readonly apiUrl: string;

  constructor(private http: HttpClient) {
    super();
    this.apiUrl = environment.apiUrl;
  }

  createSpecialWaste(specialWaste: SpecialWaste, companyID: string): Observable<SpecialWaste> {
    return this.http.post<SpecialWaste>(this.apiUrl + '/api/specialwaste',
      {specialWaste: specialWaste, companyID: companyID});
  }

  deleteSpecialWaste(value: string, type: string = '_id'): Observable<SpecialWaste> {
    return this.http.delete<SpecialWaste>(this.apiUrl + '/api/specialwaste/one/' + `${type}/${value}`);
  }

  getSpecialWaste(value: string, type: string = '_id'): Observable<SpecialWaste> {
    return this.http.get<SpecialWaste>(this.apiUrl + '/api/specialwaste/one/' + `${type}/${value}`);
  }

  getSpecialWastes(value: string, type: string): Observable<SpecialWaste[]> {
    return this.http.get<SpecialWaste[]>(this.apiUrl + '/api/specialwaste/many/' + `${type}/${value}`);
  }

  updateSpecialWaste(specialWaste: SpecialWaste, specialWasteType: string, amount: number,
                     value: string, type: string = '_id'): Observable<SpecialWaste> {
    return this.http.patch<SpecialWaste>(this.apiUrl + '/api/specialwaste/one/' + `${type}/${value}`,
      {specialWaste: specialWaste, specialWasteType: specialWasteType, amount: amount});
  }

  getCompaniesSpecialWastes(companyID: string, specialWasteType: string = 'all'): Observable<SpecialWaste[]> {
    return this.http.get<SpecialWaste[]>(this.apiUrl + '/api/company/specialwastes/' +
      `${companyID}/${specialWasteType}`);
  }


}
