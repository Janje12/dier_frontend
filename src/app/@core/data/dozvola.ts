import { Observable } from 'rxjs';
import { Katalog } from './katalog';
import { Mesto } from './mesto';
import { SkladisteTretman } from './skladisteTretman';

export interface Dozvola {
  _id: string;
  sifra: string;
  datumNastanka: Date;
  datumTrajanja: Date;
  vrstaDozvole: string;
  listaOtpada?: Katalog[];
  skladistaTretman?: SkladisteTretman;
  adresa?: {
    mesto: Mesto;
    ulica: string;
  };
}

export abstract class DozvolaData {
  abstract getDozvola(): Observable<Dozvola[]>;
}
