import { Injectable, isDevMode } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Company } from '../data/company';
import { Permit } from '../data/permit';
import { User } from '../data/user';
import { Vehicle } from '../data/vehicle';
import { CompanyService } from './company.service';
import { PermitService } from './permit.service';
import { UserService } from './user.service';
import { VehicleService } from './vehicle.service';

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

  constructor(private userService: UserService, private companyService: CompanyService,
              private permitService: PermitService, private vehicleService: VehicleService) {
    this.clearData();
    if (isDevMode()) {
      this.user = {
        email: 'serbiansolutions' + (Math.random() * 1000).toFixed(0) + '@gmail.com',
        firstName: 'Filip',
        username: 'random' + (Math.random() * 1000).toFixed(0),
        lastName: 'Balandzic',
        password: 'nikjan00',
        phone: (Math.random() * 10000000000).toFixed(0),
        role: 'manager',
      };
      this.company = {
        storages: [],
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
        operations: [],
        telephone: (Math.random() * 10000000000).toFixed(0),
        legalRep: {firstName: 'Nikola', lastName: 'Jankovic'},
        nriz: {username: '', password: ''},
        wasteManager: {
          firstName: '',
          lastName: '',
        },
      };
      this.operations = ['Transport Neopasnog Otpada'];
    }
  }

  clearData(): void {
    this.user = {email: '', firstName: '', username: '', lastName: '', password: '', phone: '', role: 'manager'};
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
      storages: [],
      permits: [],
      telephone: '',
      legalRep: {firstName: '', lastName: ''},
      wasteManager: {firstName: '', lastName: ''},
      nriz: {username: '', password: ''},
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
      return of(this.company);
    }
  }

  checkUser(user: User): Promise<boolean>[] {
    const promises = [];
    promises.push(this.userService.getUser(user.username, 'username').toPromise()
      .then(res => {
        return res === null;
      }));
    promises.push(this.userService.getUser(user.phone, 'phone').toPromise()
      .then(res => {
        return res === null;
      }));
    promises.push(this.userService.getUser(user.email, 'email').toPromise()
      .then(res => {
        return res === null;
      }));
    return promises;
  }

  checkCompany(company: Company): Promise<boolean>[] {
    const promises = [];
    promises.push(this.companyService.getCompany(company.pib, 'pib').toPromise()
      .then(res => {
        return res === null;
      }));
    promises.push(this.companyService.getCompany(company.mat, 'mat').toPromise()
      .then(res => {
        return res === null;
      }));
    promises.push(this.companyService.getCompany(company.email, 'email').toPromise()
      .then(res => {
        return res === null;
      }));
    promises.push(this.companyService.getCompany(company.emailReception, 'emailReception').toPromise()
      .then(res => {
        return res === null;
      }));
    promises.push(this.companyService.getCompany(company.telephone, 'telephone').toPromise()
      .then(res => {
        return res === null;
      }));
    if (company.nriz.username !== '') {
      promises.push(this.companyService.getCompany(company.nriz.username, 'nriz.username').toPromise()
        .then(res => {
          return res === null;
        }));
    } else {
      promises.push(true);
    }
    return promises;
  }

  checkPermits(permits: Permit[]): Promise<boolean>[] {
    const promises = [];
    for (const p of permits) {
      promises.push(this.permitService.getPermit(p.code, 'code').toPromise()
        .then(res => {
          return res === null;
        }).catch(err => {
          return true;
        }));
    }
    return promises;
  }

  checkVehicles(vehicles: Vehicle[]): Promise<boolean>[] {
    const promises = [];
    for (const v of vehicles) {
      promises.push(this.vehicleService.getVehicle(v.licensePlate, 'licensePlate').toPromise()
        .then(res => {
          return res === null;
        }));
    }
    return promises;
  }


}
