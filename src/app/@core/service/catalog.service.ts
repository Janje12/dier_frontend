import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { CatalogData, Catalog } from '../data/catalog';

@Injectable()
export class CatalogService extends CatalogData {
  private readonly apiUrl: string;

  constructor(private http: HttpClient) {
    super();
    this.apiUrl = environment.apiUrl;
  }

  createCatalog(catalog: Catalog): Observable<Catalog> {
    return undefined;
  }

  deleteCatalog(value: string, type: string): Observable<Catalog> {
    return undefined;
  }

  getCatalog(value: string, type: string = '_id'): Observable<Catalog> {
    return this.http.get<Catalog>(this.apiUrl + '/api/catalog/one/' + `${type}/${value}`);
  }

  getCatalogs(value: string = 'all', type: string = '_id'): Observable<Catalog[]> {
    return this.http.get<Catalog[]>(this.apiUrl + '/api/catalog/many/' + `${type}/${value}`);
  }

  updateCatalog(catalog: Catalog, value: string, type: string = '_id'): Observable<Catalog> {
    return this.http.patch<Catalog>(this.apiUrl + '/api/catalog/one/' + `${type}/${value}`, catalog);
  }

  // Get all safe trashes without the '*' in their indexNumber
  getSafeTrash(): Observable<Catalog[]> {
    return this.http.get<Catalog[]>(this.apiUrl + '/api/catalog/safe');
  }

  // Get all unsafe trashes with the '*' in their indexNumber
  getUnsafeTrash(): Observable<Catalog[]> {
    return this.http.get<Catalog[]>(this.apiUrl + '/api/catalog/unsafe');
  }

  filter(value: string, arr: Catalog[]): Observable<Catalog[]> {
    const filterValue = value.toLowerCase();
    if (arr === undefined) return;
    return of(arr.filter(x => x.indexNumber.toLowerCase().includes(filterValue)));
  }
}
