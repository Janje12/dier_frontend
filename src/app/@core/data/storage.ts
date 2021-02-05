import { Observable } from 'rxjs';
import { Location } from './location';
import { Trash } from './trash';
import { Package } from './package';

export interface Storage {
  _id?: string;
  name: string;
  address: {
    location: Location;
    street: string;
  };
  amount: number;
  maxAmount: number;
  geolocationNorth?: string;
  geolocationEast?: string;
  trashes?: Trash[];
  packages?: Package[];
  __t?: string;
}
export interface StorageTreatment extends Storage {
  treatment: string;
}
export interface StorageDump extends Storage {
  dumpType: string;
}
export interface StorageCache extends Storage {
  cache: string;
}
export abstract class StorageData {
  abstract createStorage(storage: Storage): Observable<Storage>;
  abstract getStorage(value: string, type: string): Observable<Storage>;
  abstract getStorages(value: string, type: string): Observable<Storage[]>;
  abstract updateStorage(storage: Storage, value: string, type: string): Observable<Storage>;
  abstract deleteStorage(value: string, type: string): Observable<Storage>;
}
