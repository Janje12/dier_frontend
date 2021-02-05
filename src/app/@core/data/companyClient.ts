import { Location } from './location';

export interface CompanyClient {
  _id?: string;
  pib: string;
  mat: string;
  name: string;
  email: string;
  fax?: string;
  telephone: string;
  operations: string[];
  address: {
    location: Location;
    street: string;
  };
}
