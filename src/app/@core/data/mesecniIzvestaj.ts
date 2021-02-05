import { Observable } from 'rxjs';
import { DnevniIzvestaj } from './dnevniIzvestaj';
import { Trash } from './trash';
import { Storage } from './storage';

export interface MesecniIzvestaj {
  _id: string;
  godina: Number;
  mesec: Number;
  otpad: Trash;
  skladiste: Storage;
  dnevniIzvestaj: DnevniIzvestaj[];
  ukupnoProizvodnja: Number;
  ukupnoTransport: Number;
  ukupnoStanje: Number;
}

export abstract class MesecniIzvestajData {
  abstract getMesecniIzvestaj(): Observable<MesecniIzvestaj[]>;
}
