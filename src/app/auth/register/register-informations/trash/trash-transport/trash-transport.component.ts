import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { getDeepFromObject, NB_AUTH_OPTIONS } from '@nebular/auth';
import { Observable, of } from 'rxjs';
import { first } from 'rxjs/operators';
import { Company } from '../../../../../@core/data/company';
import { Vehicle } from '../../../../../@core/data/vehicle';
import { RegisterService } from '../../../../../@core/service/register.service';
import { ToastrService } from '../../../../../@core/service/toastr.service';
import { TrashPermitComponent } from '../trash-permit/trash-permit.component';

@Component({
  selector: 'register-trash-transport',
  templateUrl: './trash-transport.component.html',
  styleUrls: ['./trash-transport.component.scss'],
})
export class TrashTransportComponent implements OnInit {
  @ViewChild('permitRef') permitRef: TrashPermitComponent;

  company: Company;
  vehicles: Vehicle[];
  vehicles$: Observable<Vehicle[]>;
  vehiclesNo: number = 0;
  valid: boolean = false;
  checkIssues: boolean = false;
  showVehicleInput: boolean = false;

  constructor(@Inject(NB_AUTH_OPTIONS) protected options = {}, private registerService: RegisterService,
              private toastrService: ToastrService) {
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
    this.registerService.sendCompany(of(this.company));
    this.validateVehicles();
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }

  async checkValid() {
    this.validateVehicles();
    if (!this.valid) {
      this.checkIssues = true;
      return false;
    }
    let text = '';
    const vehicleExists = await Promise.all(this.registerService.checkVehicles(this.vehicles)).then(promises => {
      for (const t of promises) {
        text = !t ? 'ta registarska tablica' : text;
        if (t)
          return t;
      }
      return false;
    });
    if (!vehicleExists) {
      this.checkIssues = true;
      this.toastrService.showToast('Greška', `Već postoji ${text}!`, 'danger');
      return false;
    }
    if (this.permitRef !== undefined && !await this.permitRef.checkValid()) {
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

  updateVehicles(vehicleNo: number, pressed: boolean) {
    if (!pressed)
      return;
    this.vehiclesNo = vehicleNo;
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
