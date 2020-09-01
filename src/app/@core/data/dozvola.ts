import { Observable } from 'rxjs';
import { Katalog } from './katalog';
import { Mesto } from './mesto';
import { Skladiste } from './skladiste';
import { SkladisteDeponija } from './skladisteDeponija';
import { SkladisteTretman } from './skladisteTretman';

export interface Dozvola {
  _id: string;
  naziv: string;
  sifra: string;
  datumNastanka: Date;
  datumTrajanja: Date;
  vrstaDozvole: string;
  listaOtpada?: Katalog[];
  skladistaTretman?: SkladisteTretman;
  skladistaDeponija?: SkladisteDeponija;
  skladistaSkladistenje?: Skladiste;
  adresa?: {
    mesto: Mesto;
    ulica: string;
  };
}

export abstract class DozvolaData {
  abstract getDozvola(): Observable<Dozvola[]>;
}
