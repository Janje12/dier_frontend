import { Observable } from 'rxjs';
import { Catalog } from './catalog';
import { Location } from './location';
import { Storage } from './storage';

export interface Permit {
  _id?: string;
  name: string;
  code: string;
  dateCreation: Date;
  dateExpiration: Date;
  type: string;
  trashList: Catalog[];
  storage?: Storage;
  address?: {
    location: Location;
    street: string;
  };
  __t?: string;
}

export abstract class PermitData {
  abstract createPermit(permit: Permit, companyID: string): Observable<Permit>;
  abstract getPermit(value: string, type: string): Observable<Permit>;
  abstract getPermits(value: string, type: string): Observable<Permit[]>;
  abstract updatePermit(permit: Permit, value: string, type: string): Observable<Permit>;
  abstract deletePermit(value: string, type: string): Observable<Permit>;
}
