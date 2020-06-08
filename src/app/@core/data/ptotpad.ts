import { OOtpad } from './ootpad';
import { Observable } from 'rxjs';

export interface PTOtpad extends OOtpad {
  masa: number;
  jedinicaMere: string;
}

export abstract class PTOtpadData {
  abstract getPTOtpad(): Observable<PTOtpad[]>;
}
