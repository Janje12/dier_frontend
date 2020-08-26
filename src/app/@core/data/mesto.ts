import { Observable } from 'rxjs';

export interface Mesto {
  _id?: string;
  mestoSifra: number;
  mestoNaziv: string;
  opstinaSifra: number;
  opstinaNaziv: string;
  postanskiBroj: string;
}

export abstract class MestoData {
  abstract getMesto(): Observable<Mesto[]>;

}
