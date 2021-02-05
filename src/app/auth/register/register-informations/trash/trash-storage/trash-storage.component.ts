import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { getDeepFromObject, NB_AUTH_OPTIONS } from '@nebular/auth';
import { Observable, of } from 'rxjs';
import { first } from 'rxjs/operators';
import { Company } from '../../../../../@core/data/company';
import { Storage, StorageCache, StorageDump, StorageTreatment } from '../../../../../@core/data/storage';
import { LocationService } from '../../../../../@core/service/location.service';
import { RegisterService } from '../../../../../@core/service/register.service';
import { TrashPermitComponent } from '../trash-permit/trash-permit.component';

@Component({
  selector: 'register-trash-storage',
  templateUrl: './trash-storage.component.html',
  styleUrls: ['./trash-storage.component.css'],
})
export class TrashStorageComponent implements OnInit {
  @ViewChild('permitRef')
  permitRef: TrashPermitComponent;
  @Input() storageType: string;
  @Input() trashType: string;

  company: Company;
  storageNo: number = 1;
  initStorage: Storage[] = [];
  storages: any[];
  storages$: Observable<any[]>;
  storageAmmountUnit: string = 'KG';
  townships: string[];
  townships$: Observable<string[]>;
  places: string[];
  places$: Observable<string[]>;
  checkIssues: boolean = false;
  valid: boolean = false;

  constructor(@Inject(NB_AUTH_OPTIONS) protected options = {}, private registerService: RegisterService,
              private locationService: LocationService) {
    if (this.storageType === 'production') {
      this.storages = (this.initStorage as Storage[]);
    } else if (this.storageType === 'treatment') {
      this.storages = (this.initStorage as StorageTreatment[]);
    } else if (this.storageType === 'dump') {
      this.storages = (this.initStorage as StorageDump[]);
    } else if (this.storageType === 'cache') {
      this.storages = (this.initStorage as StorageCache[]);
    }
  }

  ngOnInit(): void {
    this.registerService.getCompany().pipe(first()).subscribe(f => {
      if (f !== undefined) {
        this.company = f;
        if (f.storages !== undefined) {
          this.storages = this.company.storages.filter(s => {
            if (this.storageType === 'production') {
              return s.__t === undefined;
            } else if (this.storageType === 'treatment') {
              return s.__t === 'StorageTreatment';
            } else if (this.storageType === 'dump') {
              return s.__t === 'StorageDump';
            } else if (this.storageType === 'cache') {
              return s.__t === 'StorageCache';
            }
          });
          this.storageNo = this.storages.length;
          this.storages$ = of(this.storages);
        }
      }
    });
    this.validateStorage();
    this.registerService.sendCompany(of(this.company));
    this.locationService.getDistinctTownships().pipe(first()).subscribe(o => {
      this.townships = o;
      this.townships$ = of(o);
    });
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }

  checkValid(): boolean {
    this.validateStorage();
    if (this.permitRef !== undefined && !this.permitRef.checkValid())
      return false;
    if (this.valid)
      return true;
    else {
      this.checkIssues = true;
      return false;
    }
  }

  validateStorage(): void {
    if (this.storages === undefined)
      return;
    this.valid = this.storages.length > 0;
    for (const s of this.storages) {
      if (s.name === '' || s.name.length < 3) {
        this.valid = false;
        break;
      }
      if (this.storageAmmountUnit === 'T') {
        s.maxAmount *= 1000;
      }
      if (s.maxAmount < 1 || isNaN(s.maxAmount)) {
        this.valid = false;
        break;
      }
      if (s.address.location.placeName === '' || s.address.location.townshipName === '') {
        this.valid = false;
        break;
      }
      if (s.address.street === '') {
        this.valid = false;
        break;
      }
      if (this.storageType === 'dump' && s.dumpType === '') {
        this.valid = false;
        break;
      }
    }
  }

  updateStorages() {
    this.storages = new Array(this.storageNo);
    for (let i = 0; i < this.storageNo; i++) {
      this.storages[i] = {
        address: {location: {placeName: '', placeCode: 0, townshipName: '', townshipCode: 0, zipCode: ''}, street: ''},
        amount: 0,
        geolocationEast: '',
        geolocationNorth: '',
        maxAmount: 0,
        name: '',
        packages: [],
        trashes: [],
      };
      if (this.storageType === 'cache') {
        this.storages[i].cache = 'cache';
      }
      if (this.storageType === 'treatment') {
        this.storages[i].treatment = 'treatment';
      }
      if (this.storageType === 'dump') {
        this.storages[i].dumpType = '';
      }
    }
    this.storages$ = of(this.storages);
    this.company.storages = this.storages;
    this.validateStorage();
  }

  private getPlaces(townshipName: string): void {
    if (townshipName === undefined) return;
    this.locationService.getPlacesFromTownship(townshipName).pipe(first()).subscribe(m => {
      this.places = m;
      this.places$ = of(m);
    });
  }

  chooseTownship(value: string) {
    if (value === '') {
      this.townships$ = of(this.townships);
      return;
    }
    this.townships$ = this.locationService.filter(value, this.townships);
    if (this.townships$ !== undefined)
      this.townships$.subscribe(x => this.getPlaces(x[0]));
  }

  findPlaces(value: string) {
    this.places$ = this.locationService.filter(value, this.places);
  }

  isNaN(value: any): boolean {
    if (isNaN(value) || value === undefined)
      return true;
    return false;
  }
}
