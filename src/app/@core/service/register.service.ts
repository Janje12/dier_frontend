import { Injectable, isDevMode } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Company } from '../data/company';
import { User } from '../data/user';

@Injectable()
export class RegisterService {
  private user$: Observable<User>;
  private user: User;
  private company$: Observable<Company>;
  private company: Company;
  private operations$: Observable<string[]>;
  private operations: string[];
  private permitCode: string;
  private permitCode$: Observable<string>;

  constructor() {
    if (isDevMode()) {
      this.user = {
        _id: '',
        email: 'random' + (Math.random() * 1000).toFixed(0) + '@gmail.com',
        firstName: 'test',
        username: 'random' + (Math.random() * 1000).toFixed(0),
        lastName: 'test',
        password: 'nikjan00',
        phone: (Math.random() * 10000000000).toFixed(0),
        role: 'manager',
      };
      this.company = {
        storages: [
          {
            name: 'Storage #1',
            amount: 0,
            maxAmount: 512,
            address: {
              location: {
                placeCode: 0,
                placeName: 'Arnajevo',
                townshipCode: 0,
                townshipName: 'Beograd',
                zipCode: '31210',
              }, street: 'Nikola tesla 2',
            },
          },
        ],
        address: {
          location: {
            placeCode: 0,
            placeName: 'Arnajevo',
            townshipCode: 0,
            townshipName: 'Beograd',
            zipCode: '31210',
          }, street: 'Nikola tesla 2',
        },
        occupation: {
          code: '',
          name: 'Proizvodnja mesnih prerađevina',
        },
        email: 'random1' + (Math.random() * 1000).toFixed(0) + '@gmail.com',
        emailReception: 'random' + (Math.random() * 1000).toFixed(0) + '@gmail.com',
        mat: (Math.random() * 100000000).toFixed(0),
        manager: 'random',
        name: 'Test',
        pib: (Math.random() * 1000000000).toFixed(0),
        operations: ['Proizvodnja Neopasnog Otpada'],
        telephone: (Math.random() * 10000000000).toFixed(0),
        legalRep: 'Nikola Jankovic',
      };
      this.operations = ['Proizvodnja Neopasnog Otpada'];
    }
  }

  clearData(): void {
    this.user = {email: '', firstName: '', username: '', lastName: '', password: '', phone: '', role: ''};
    this.company = {
      occupation: {code: '', name: ''},
      address: {location: {townshipCode: 0, townshipName: '', placeCode: 0, placeName: '', zipCode: ''}, street: ''},
      email: '',
      emailReception: '',
      mat: '',
      manager: '',
      name: '',
      pib: '',
      operations: [],
      telephone: '',
      legalRep: '',
    };
    this.operations = [];
    this.permitCode = '';
  }


  sendPermit(permitCode: Observable<string>): void {
    this.permitCode$ = permitCode;
    permitCode.subscribe(d => {
      this.permitCode = d;
    });
  }

  getPermit(): Observable<string> {
    return of(this.permitCode);
  }

  sendOperations(operations: Observable<string[]>): void {
    this.operations$ = operations;
    operations.subscribe(o => {
      this.operations = o;
    });
  }

  getOperations(): Observable<string[]> {
    return of(this.operations);
  }

  sendUser(user: Observable<User>): void {
    this.user$ = user;
    user.subscribe(k => {
      this.user = k;
    });
  }

  getUser(): Observable<User> {
    if (this.company !== undefined && this.user !== undefined) {
      this.user.company = this.company;
    }
    return of(this.user);
  }

  sendCompany(company: Observable<Company>): void {
    this.company$ = company;
    company.subscribe(f => {
      this.company = f;
    });
  }

  getCompany(): Observable<Company> {
    if (this.company !== undefined) {
      if (this.operations !== undefined) {
        this.company.operations = this.operations;
      }
      if (this.user !== undefined) {
        this.company.manager = this.user.username;
      }
    }
    return of(this.company);
  }
}
