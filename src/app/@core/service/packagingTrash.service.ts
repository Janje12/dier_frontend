import { Injectable } from '@angular/core';
import { PackagingTrash, PackagingTrashData } from '../data/packagingTrash';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';

@Injectable()
export class PackagingTrashService extends PackagingTrashData {
  constructor(private http: HttpClient) {
    super();
  }

  getPackagingTrashes(): Observable<PackagingTrash[]> {
    return undefined;
  }

}

