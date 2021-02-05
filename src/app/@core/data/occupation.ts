import { Observable } from 'rxjs';

export interface Occupation {
  _id?: string;
  code: string;
  name: string;
}

export abstract class OccupationData {
  abstract createOccupation(occupation: Occupation): Observable<Occupation>;
  abstract getOccupation(value: string, type: string): Observable<Occupation>;
  abstract getOccupations(value: string, type: string): Observable<Occupation[]>;
  abstract updateOccupation(occupation: Occupation, value: string, type: string): Observable<Occupation>;
  abstract deleteOccupation(value: string, type: string): Observable<Occupation>;
}
