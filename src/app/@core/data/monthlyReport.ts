import { Observable } from 'rxjs';
import { DailyReport } from './dailyReport';
import { Trash } from './trash';
import { Storage } from './storage';

export interface MonthlyReport {
  _id: string;
  year: Number;
  month: Number;
  trash: Trash;
  storage: Storage;
  dailyReport: DailyReport[];
  totalProduction: Number;
  totalTransport: Number;
  total: Number;
}

export abstract class MonthlyReportData {
  abstract getMonthlyReport(): Observable<MonthlyReport[]>;
}
