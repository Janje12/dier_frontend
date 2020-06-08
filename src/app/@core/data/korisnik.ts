import { Observable } from 'rxjs';
import { Firma } from './firma';

export interface Korisnik {
  _id: string;
  ime: string;
  prezime: string;
  email: string;
  korisnickoIme: string;
  sifra: string;
  telefon: string;
  uloga: string;
  firma?: Firma;
}


export abstract class KorisnikData {
  abstract getKorisnik(): Observable<Korisnik>;
}
