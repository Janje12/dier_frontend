import { Observable } from 'rxjs';
import { Company } from './company';
import { DKO } from './dko';
import { SpecialWaste } from './specialWaste';
import { User } from './user';
import { Trash } from './trash';
import { Storage } from './storage';

export interface Transaction {
  _id?: string;
  user: User;
  company: Company;
  date: Date;
  transactionType: string;
  method: string;
  specialWaste?: SpecialWaste;
  specialWasteType?: string;
  trash?: Trash;
  storage?: Storage;
  trashAmount?: number;
  previousAmount?: number;
  currentAmount?: number;
  companyName?: string;
  wmdNo?: string;
  sign?: string;
  wmd?: DKO;
  finished?: boolean;
}

export abstract class TransactionData {
  abstract createTransaction(transaction: Transaction): Observable<Transaction>;
  abstract getTransaction(value: string, type: string): Observable<Transaction>;
  abstract getTransactions(value: string, type: string): Observable<Transaction[]>;
  abstract updateTransaction(transaction: Transaction, value: string, type: string): Observable<Transaction>;
  abstract deleteTransaction(value: string, type: string): Observable<Transaction>;
}
