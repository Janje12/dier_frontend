import { Observable } from 'rxjs';

export interface Ambalaza {
  _id: string;
  naziv: string;
  opis: string;
  kolicina: number;
  povratna: boolean;
}

export abstract class AmbalazaData {
  abstract getAmbalaza(): Observable<Ambalaza[]>;
}
