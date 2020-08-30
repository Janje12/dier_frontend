import { Observable } from 'rxjs';
import { Delatnost } from './delatnost';
import { Dozvola } from './dozvola';
import { Mesto } from './mesto';
import { PrevoznoSredstvo } from './prevoznoSredstvo';
import { Skladiste } from './skladiste';
import { SkladisteDeponija } from './skladisteDeponija';
import { SkladisteTretman } from './skladisteTretman';

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
  prevoznoSredstvo?: PrevoznoSredstvo[];
  menadzer: string;
  skladista?: Skladiste[];
  skladistaTretman?: SkladisteTretman[];
  skladistaDeponija?: SkladisteDeponija[];
  skladisteSkladistenje?: Skladiste[];
}

export abstract class FirmaData {
  abstract getFirma(): Observable<Firma[]>;
}
