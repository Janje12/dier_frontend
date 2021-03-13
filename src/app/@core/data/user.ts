import { Observable } from 'rxjs';
import { Company } from './company';

export interface User {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  phone: string;
  role: string;
  company?: Company;
  verified?: boolean;
  token?: string;
}

export abstract class UserData {
  abstract createUser(user: User): Observable<User>;

  abstract getUser(value: string, type: string): Observable<User>;

  abstract getUsers(value: string, type: string): Observable<User[]>;

  abstract updateUser(user: User, value: string, type: string): Observable<User>;

  abstract deleteUser(value: string, type: string): Observable<User>;
}
