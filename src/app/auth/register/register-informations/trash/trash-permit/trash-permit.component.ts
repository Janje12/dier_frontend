import { Component, Inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getDeepFromObject, NB_AUTH_OPTIONS } from '@nebular/auth';
import { Observable, of } from 'rxjs';
import { first } from 'rxjs/operators';
import { Company } from '../../../../../@core/data/company';
import { Permit } from '../../../../../@core/data/permit';
import { Storage } from '../../../../../@core/data/storage';
import { RegisterService } from '../../../../../@core/service/register.service';
import { ToastrService } from '../../../../../@core/service/toastr.service';

@Component({
  selector: 'register-trash-permit',
  templateUrl: './trash-permit.component.html',
  styleUrls: ['./trash-permit.component.css'],
})
export class TrashPermitComponent implements OnInit {
  @Input() permitType: string;
  @Input() storageNo: number;
  @Input() storages: Storage[] = [];

  permits: Permit[];
  permits$: Observable<Permit[]>;
  permitsNo: number = 0;
  storages$: Observable<Storage[]>;
  company: Company;
  checkIssues: boolean = false;
  valid: boolean = false;
  showPermitsInput: boolean = false;

  constructor(@Inject(NB_AUTH_OPTIONS) protected options = {}, private router: Router,
              private registerService: RegisterService, private toastrService: ToastrService) {
  }

  ngOnInit(): void {
    this.registerService.getCompany().pipe(first()).subscribe(f => {
      if (f !== undefined) {
        this.company = f;
        if (f.permits !== undefined) {
          this.permits = this.company.permits.filter(x => x.type === this.permitType);
          this.permitsNo = this.permits.length;
          this.permits$ = of(this.permits);
        }
      }
    });
    if (this.permitType !== 'transport' && this.permitType !== 'collector') {
      this.permitsNo = this.storageNo;
      this.storages$ = of(this.storages);
    }
    this.validatePermits();
    this.registerService.sendCompany(of(this.company));
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }

  async checkValid() {
    this.validatePermits();
    if (!this.valid) {
      this.checkIssues = true;
      return false;
    }
    let text = '';
    const permitExists = await Promise.all(this.registerService.checkPermits(this.permits)).then(promises => {
      for (const t of promises) {
        text = !t ? 'ta šifra' : text;
        if (t)
          return t;
      }
      return false;
    });
    if (!permitExists) {
      this.checkIssues = true;
      this.toastrService.showToast('Greška', `Već postoji ${text} dozvole!`, 'danger');
      return false;
    }
    if (this.valid)
      return true;
    else {
      this.checkIssues = true;
      return false;
    }
  }

  validatePermits(): void {
    if (!this.permits)
      return;
    this.valid = this.permits.length > 0;
    for (const d of this.permits) {
      if (d.name === '' || d.name.length < 3) {
        this.valid = false;
        break;
      }
      if (d.code === '') {
        this.valid = false;
        break;
      }
      if (d.dateCreation === undefined || d.dateExpiration === undefined) {
        this.valid = false;
        break;
      }
      if (d.storage === undefined && (this.permitType !== 'transport' && this.permitType !== 'collector')) {
        this.valid = false;
        break;
      }
      if (d.trashList.length < 1) {
        this.valid = false;
        break;
      }
    }
  }

  updatePermits(storageNo?: number, storages$?: Observable<Storage[]>, pressed?: boolean) {
    if (pressed !== undefined && pressed === false)
      return;
    if (storageNo !== undefined) {
      this.permitsNo = storageNo;
    }
    if (storages$ !== undefined)
      this.storages$ = storages$;
    if (this.company.permits) {
      if (this.permitType === 'transport') {
        this.company.permits = this.company.permits.filter(x => x.type !== 'transport');
      } else if (this.permitType === 'collector') {
        this.company.permits = this.company.permits.filter(x => x.type !== 'collector');
      }
    } else {
      this.company.permits = [];
    }
    this.permits = new Array(this.permitsNo);
    for (let i = 0; i < this.permitsNo; i++) {
      this.permits[i] = {
        address: {location: undefined, street: ''},
        code: '',
        dateCreation: new Date(),
        dateExpiration: new Date(),
        name: '',
        storage: {
          name: '', maxAmount: 0, address:
            {location: {placeCode: 0, placeName: '', townshipCode: 0, townshipName: '', zipCode: ''}, street: ''},
          amount: 0,
        },
        trashList: [],
        type: this.permitType,
      };
      if (this.permitType === 'transport' || this.permitType === 'collector') {
        delete this.permits[i].storage;
        delete this.permits[i].address;
      }
    }
    this.permits$ = of(this.permits);
    this.permits.forEach(t => this.company.permits.push(t));
    this.validatePermits();
  }

  choosePermit(permit: Permit): void {
    this.registerService.sendPermit(of(permit.code));
    this.router.navigate(['/auth/register-permit']);
  }

  dateValid(permit: Permit): Boolean {
    return permit.dateCreation <= permit.dateExpiration;
  }

  setAddress(permit: Permit, storage: Storage) {
    permit.address = storage.address;
  }
}
