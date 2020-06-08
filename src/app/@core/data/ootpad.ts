import { Observable } from 'rxjs';
import { NOtpad } from './notpad';

export interface OOtpad extends NOtpad {
  hLista: string;
  yLista: string;
  cLista: string;
  hemijskiNaziv: string;
  cas: string;
  kgMaterije: number;
}

export abstract class OOtpadData {
  abstract getOOtpad(): Observable<OOtpad[]>;
}
