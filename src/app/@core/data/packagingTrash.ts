import { Observable } from 'rxjs';
import { Trash } from './trash';

export interface PackagingTrash extends Trash {
  communal: boolean;
}

export abstract class PackagingTrashData {
  abstract getPackagingTrashes(): Observable<PackagingTrash[]>;
}
