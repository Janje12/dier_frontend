import { Observable } from 'rxjs';
import { Delatnost } from './delatnost';
import { Dozvola } from './dozvola';
import { Mesto } from './mesto';
import { Skladiste } from './skladiste';

export interface Firma {
  _id: string;
  pib: string;
  mat: string;
  naziv: string;
  email: string;
  faks?: string;
  emailPrijem: string;
  telefon: string;
  zakonskiZastupnik: string;
  radFirme: string[];
  adresa: {
    mesto: Mesto;
    ulica: string;
  };
  delatnost: Delatnost;
  dozvola?: Dozvola[];
  menadzer: string;
  skladista?: Skladiste[];
}

export abstract class FirmaData {
  abstract getFirma(): Observable<Firma>;
}
