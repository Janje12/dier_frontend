import { Trash } from './trash';

export interface UnsafeTrash extends Trash {
  hList: string;
  yList: string;
  cList: string;
  unsafeComponent?: {
    CAS: string;
    chemicalName: string;
    kgOfMatter: number;
  }[];
}
