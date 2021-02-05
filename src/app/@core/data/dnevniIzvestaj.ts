import { Observable } from 'rxjs';
import { Trash } from './trash';
import { Storage } from './storage';

export interface DnevniIzvestaj {
  _id?: string;
  godina: number;
  mesec: number;
  dan: number;
  otpad: Trash;
  skladiste: Storage;
  akcijaProizvodnja: any;
  akcijaTransport: any;
  ukupnoProizvodnja: number;
  ukupnoTransport: number;
  ukupnoStanje: number;
  nazivFirme: string;
  brojDozvole: string;
}

export abstract class DnevniIzvestajData {
  abstract getDnevniIzvestaj(): Observable<DnevniIzvestaj[]>;
}
