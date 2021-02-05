import { UnsafeTrash } from './unsafeTrash';

export interface SpecialWasteTrash extends UnsafeTrash {
  mass: number;
  unitOfMeasure: string;
}
