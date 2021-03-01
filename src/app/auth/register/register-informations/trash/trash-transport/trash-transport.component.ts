import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { getDeepFromObject, NB_AUTH_OPTIONS } from '@nebular/auth';
import { Observable, of } from 'rxjs';
import { first } from 'rxjs/operators';
import { Company } from '../../../../../@core/data/company';
import { Vehicle } from '../../../../../@core/data/vehicle';
import { RegisterService } from '../../../../../@core/service/register.service';
import { TrashPermitComponent } from '../trash-permit/trash-permit.component';

@Component({
  selector: 'register-trash-transport',
  templateUrl: './trash-transport.component.html',
  styleUrls: ['./trash-transport.component.scss'],
})
export class TrashTransportComponent implements OnInit {
  @ViewChild('permitRef')
  permitRef: TrashPermitComponent;
  valid: boolean = false;
  checkIssues: boolean = false;
  company: Company;
  vehiclesNo: number = 1;
  vehicles: Vehicle[];
  vehicles$: Observable<Vehicle[]>;

  constructor(@Inject(NB_AUTH_OPTIONS) protected options = {}, private registerService: RegisterService) {
  }

  ngOnInit(): void {
    this.registerService.getCompany().pipe(first()).subscribe(f => {
      if (f !== undefined) {
        this.company = f;
        if (f.vehicles !== undefined) {
          this.vehiclesNo = this.company.vehicles.length;
          this.vehicles = this.company.vehicles;
          this.vehicles$ = of(this.vehicles);
        }
      }
    });
    this.validateVehicles();
    this.registerService.sendCompany(of(this.company));
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }

  checkValid(): boolean {
    this.validateVehicles();
    if (this.permitRef !== undefined && !this.permitRef.checkValid()) {
      return false;
    }
    if (this.valid)
      return true;
    else {
      this.checkIssues = true;
      return false;
    }
  }

  validateVehicles(): void {
    if (this.vehicles === undefined)
      return;
    this.valid = this.vehicles.length > 0;
      for (const p of this.vehicles) {
        if (p.licensePlate === '' || p.licensePlate.length < 9) {
          this.valid = false;
          break;
        }
        if (p.type === '') {
          this.valid = false;
          break;
        }
    }
  }

  updateVehiclesForm() {
    this.vehicles = new Array(this.vehiclesNo);
    for (let i = 0; i < this.vehiclesNo; i++) {
      this.vehicles[i] = {
        licensePlate: '', type: '',
      };
    }
    this.company.vehicles = this.vehicles;
    this.vehicles$ = of(this.vehicles);
    this.validateVehicles();
  }

}
