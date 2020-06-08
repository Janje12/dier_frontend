import { Observable } from 'rxjs';
import { Katalog } from './katalog';
import { Mesto } from './mesto';

export interface Dozvola {
  _id: string;
  sifra: string;
  datum: Date;
  vrstaDozvole: string;
  listaOtpada: Katalog[];
  adresa: {
    mesto: Mesto;
    ulica: string;
  };
}

export abstract class DozvolaData {
  abstract getDozvola(): Observable<Dozvola[]>;
}
