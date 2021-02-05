import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User, UserData } from '../data/user';

@Injectable()
export class UserService extends UserData {
  private readonly apiUrl: string;

  constructor(private http: HttpClient) {
    super();
    this.apiUrl = environment.apiUrl;
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl + '/api/user', user);
  }

  deleteUser(value: string, type: string): Observable<User> {
    return undefined;
  }

  getUser(value: string, type: string = '_id'): Observable<User> {
    return this.http.get<User>(this.apiUrl + '/api/user/one/' + `${type}/${value}`);
  }

  getUsers(value: string, type: string = '_id'): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl + '/api/user/many/' + `${type}/${value}`);
  }

  updateUser(user: User, value: string, type: string = '_id'): Observable<User> {
    return this.http.patch<User>(this.apiUrl + '/api/user/one/' + `${type}/${value}`, user);
  }

  // Get the users 'profile' information
  getUserProfile(username: string): Observable<User> {
    return this.http.get<User>(this.apiUrl + '/api/user/profile/' + username);
  }

}