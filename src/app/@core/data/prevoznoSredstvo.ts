import { Observable } from 'rxjs';

export interface PrevoznoSredstvo {
  _id: string;
 vrstaVozila: string;
 registarskiBroj: string;
}

export abstract class PrevoznoSredstvoData {
  abstract getPrevoznoSredstvo(): Observable<PrevoznoSredstvo[]>;
}
