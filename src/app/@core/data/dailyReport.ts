import { Observable } from 'rxjs';
import { Trash } from './trash';
import { Storage } from './storage';

export interface DailyReport {
  _id?: string;
  year: number;
  month: number;
  day: number;
  trash: Trash;
  storage: Storage;
  companyName: string;
  wmdNo: string;
  transactionProduction: any[];
  transactionTransport: any[];
  totalProduction: number;
  totalTransport: number;
  total: number;

}

export abstract class DailyReportData {
  abstract getDailyReport(): Observable<DailyReport[]>;
}
