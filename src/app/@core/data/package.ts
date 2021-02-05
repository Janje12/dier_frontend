import { Observable } from 'rxjs';

export interface Package {
  _id?: string;
  name: string;
  desc: string;
  amount: number;
  reusable: boolean;
}

export abstract class PackageData {
  abstract getPackage(): Observable<Package[]>;
}
