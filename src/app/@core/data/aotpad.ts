import { Observable } from 'rxjs';
import { NOtpad } from './notpad';

export interface AOtpad extends NOtpad {
  komunalan: boolean;
}

export abstract class AOtpadData {
  abstract getAOtpad(): Observable<AOtpad[]>;
}
