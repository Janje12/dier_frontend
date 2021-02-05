import { Observable } from 'rxjs';

export interface Catalog {
  _id?: string;
  indexNumber: string;
  name: string;
}

export abstract class CatalogData {
  abstract createCatalog(catalog: Catalog): Observable<Catalog>;
  abstract getCatalog(value: string, type: string): Observable<Catalog>;
  abstract getCatalogs(value: string, type: string): Observable<Catalog[]>;
  abstract updateCatalog(catalog: Catalog, value: string, type: string): Observable<Catalog>;
  abstract deleteCatalog(value: string, type: string): Observable<Catalog>;
}
