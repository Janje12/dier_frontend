import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Transaction, TransactionData } from '../data/transaction';

@Injectable()
export class TransactionsService extends TransactionData {
  private readonly apiUrl: string;

  constructor(private http: HttpClient) {
    super();
    this.apiUrl = environment.apiUrl;
  }

  createTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(this.apiUrl + '/api/transaction', transaction);
  }

  deleteTransaction(value: string, type: string = '_id'): Observable<Transaction> {
    return this.http.delete<Transaction>(this.apiUrl + '/api/transaction/one/' + `${type}/${value}`);
  }

  getTransaction(value: string, type: string = '_id'): Observable<Transaction> {
    return this.http.get<Transaction>(this.apiUrl + '/api/transaction/one/' + `${type}/${value}`);
  }

  getTransactions(value: string, type: string = '_id'): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.apiUrl + '/api/transaction/many/' + `${type}/${value}`);
  }

  updateTransaction(transaction: Transaction, value: string, type: string = '_id'): Observable<Transaction> {
    return this.http.patch<Transaction>(this.apiUrl + '/api/transaction/one/' + `${type}/${value}`, transaction);
  }

  // GET all the Transactions[] where the Trash was transported
  getTransportersTransactions(trashID: string = ''): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.apiUrl + '/api/transaction/transport/' + trashID);
  }

  /* GET Unfinished Transactions[] that have not yet been
   completed in the trash process (e.g. finish the amount processed of a trash) */
  getUnfinishedTransactions(trashID: string, companyID: string): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.apiUrl + '/api/transaction/unfinished/' + `${trashID}/${companyID}`);
  }

  // GET the most used trash in that operation type (production, treatment, etc.)
  getMostUsedTrash(operationType: string, count: number = 5): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.apiUrl + '/api/transaction/mostused/' + operationType + '/' + count);
  }

}
