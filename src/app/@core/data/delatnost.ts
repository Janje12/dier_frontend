import { Observable } from 'rxjs';

export interface Delatnost {
  _id: string;
  sifra: string;
  naziv: string;
}

export abstract class DelatnostData {
  abstract getDelatnost(): Observable<Delatnost[]>;
}
