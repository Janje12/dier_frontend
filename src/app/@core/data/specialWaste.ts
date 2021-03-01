import { Observable } from 'rxjs';

export interface SpecialWaste {
  _id?: string;
  name: string;
  desc: string;
  amount: number;
  operationTypes: string[];
  mass: number;
  unitOfMeasure: string;
}

export abstract class SpecialWasteData {
  abstract createSpecialWaste(specialWaste: SpecialWaste, comapnyID: string): Observable<SpecialWaste>;
  abstract getSpecialWaste(value: string, type: string): Observable<SpecialWaste>;
  abstract getSpecialWastes(value: string, type: string): Observable<SpecialWaste[]>;
  abstract updateSpecialWaste(specialWaste: SpecialWaste, specialWasteType: string,
                              amount: number, value: string, type: string): Observable<SpecialWaste>;
  abstract deleteSpecialWaste(value: string, type: string): Observable<SpecialWaste>;
}
