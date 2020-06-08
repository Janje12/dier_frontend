import { Observable } from 'rxjs';

export interface NOtpad {
  _id: string;
  indeksniBroj: string;
  naziv: string;
  opis: string;
  kolicina: number;
  fizickoStanje: string;
  qLista?: string;
  nacinPakovanja?: string;
}

export abstract class NOtpadData {
  abstract getNOtpad(): Observable<NOtpad[]>;
}
