import { Observable } from 'rxjs';
import { Mesto } from './mesto';
import { NOtpad } from './notpad';
import { OOtpad } from './ootpad';
import { PTOtpad } from './ptotpad';
import { AOtpad } from './aotpad';
import { Ambalaza } from './ambalaza';

export interface Skladiste {
  _id: string;
  naziv: string;
  kolicina: number;
  maxKolicina: number;
  adresa: {
    mesto: Mesto;
    ulica: string;
  };
  neopasniOtpad?: NOtpad[];
  opasniOtpad?: OOtpad[];
  inventarPTO?: PTOtpad[];
  inventarAO?: AOtpad[];
  inventarAM?: Ambalaza[];
}

export abstract class SkladisteData {
  abstract getSkladiste(): Observable<Skladiste[]>;
}
