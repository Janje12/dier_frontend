import { Observable } from 'rxjs';
import { Occupation } from './occupation';
import { Permit } from './permit';
import { CompanyClient } from './companyClient';
import { SpecialWaste } from './specialWaste';
import { Storage } from './storage';
import { Vehicle } from './vehicle';

export interface Company extends CompanyClient {
  manager: string;
  emailReception: string;
  legalRep: {
    firstName: string;
    lastName: string;
  };
  nriz: {
    username: string;
    password: string;
  };
  wasteManager?: {
    firstName: string;
    lastName: string;
  };
  occupation: Occupation;
  permits?: Permit[];
  storages?: Storage[];
  specialWastes?: SpecialWaste[];
  vehicles?: Vehicle[];
}

export abstract class CompanyData {
  abstract createCompany(company: Company): Observable<Company>;
  abstract getCompany(value: string, type: string): Observable<Company>;
  abstract getCompanys(value: string, type: string): Observable<Company[]>;
  abstract updateCompany(company: Company, value: string, type: string): Observable<Company>;
  abstract deleteCompany(value: string, type: string): Observable<Company>;
}
