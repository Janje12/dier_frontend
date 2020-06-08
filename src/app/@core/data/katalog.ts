import { Observable } from 'rxjs';

export interface Katalog {
  _id: string;
  indeksniBroj: string;
  naziv: string;
}

export abstract class KatalogData {
  abstract getKatalog(): Observable<Katalog[]>;
}
