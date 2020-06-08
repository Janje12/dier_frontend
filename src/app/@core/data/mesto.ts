import { Observable } from 'rxjs';

export interface Mesto {
  _id: string;
  mesto?: {
    sifra: number;
    naziv: string;
  };
  opstina: {
    sifra: number;
    naziv: string;
  };
  postanskiBroj: string;
}

export abstract class MestoData {
  abstract getMesto(): Observable<Mesto[]>;

}
