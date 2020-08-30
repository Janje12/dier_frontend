import { Observable } from 'rxjs';
import { Skladiste } from './skladiste';

export interface SkladisteDeponija extends Skladiste {
  geolokacijaN: number;
  geolokacijaE: number;
  vrstaDeponije: string;
}

export abstract class SkladisteDeponijaData {
  abstract getSkladisteDeponija(): Observable<SkladisteDeponija[]>;
}
