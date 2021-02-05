import { Package, PackageData } from '../data/package';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable()
export class PackageService extends PackageData {
  constructor(private http: HttpClient) {
    super();
  }

  getPackage(): Observable<Package[]> {
    return this.http.get<Package[]>('/api/pacakage');
  }

  static getPacakgeType(): Observable<string[]> {
    const vrsteAmbalaza: string[] = ['PET', 'Staklo', 'Druga vrsta plastike', 'Gvožđe', 'Aluminijum',
      'Palete', 'Ostalo Drvo', 'Tekstil', 'Keramika', 'Druge vrste ambalaže'];
    return of(vrsteAmbalaza);
  }

}
