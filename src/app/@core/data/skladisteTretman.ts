import { Observable } from 'rxjs';
import { Skladiste } from './skladiste';

export interface SkladisteTretman extends Skladiste {
  geolokacijaN: number;
  geolokacijaE: number;
}

export abstract class SkladisteTretmanData {
  abstract getSkladisteTretman(): Observable<SkladisteTretman[]>;
}
