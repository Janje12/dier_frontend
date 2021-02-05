import { Observable } from 'rxjs';

export interface Trash {
  _id?: string;
  indexNumber: string;
  name: string;
  desc: string;
  amount: number;
  state?: string;
  qList?: string;
  packaging?: string;
  rSign?: string;
  dSign?: string;
  examinationCode?: string;
  examinationDate?: Date;
}

export abstract class TrashData {
  abstract createTrash(trash: Trash, storageID: string): Observable<Trash>;
  abstract getTrash(value: string, type: string): Observable<Trash>;
  abstract getTrashes(value: string, type: string): Observable<Trash[]>;
  abstract updateTrash(trash: Trash, value: string, type: string): Observable<Trash>;
  abstract deleteTrash(value: string, type: string): Observable<Trash>;
}
