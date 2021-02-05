import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { getDeepFromObject, NB_AUTH_OPTIONS } from '@nebular/auth';
import { NbComponentStatus, NbToastrService } from '@nebular/theme';
import { first } from 'rxjs/operators';
import { Vehicle } from '../../../@core/data/vehicle';
import { RoleService } from '../../../@core/service/role.service';
import { VehicleService } from '../../../@core/service/vehicle.service';

@Component({
  selector: 'profile-vehicle',
  templateUrl: './profile-vehicles.component.html',
  styleUrls: ['./profile-vehicles.component.scss'],
})
export class ProfileVehiclesComponent implements OnInit {

  vehicles: Vehicle[] = [];
  inputsDisabled: boolean = true;

  constructor(private vehicleService: VehicleService, private roleService: RoleService,
              @Inject(NB_AUTH_OPTIONS) protected options = {},
              private toastrService: NbToastrService) {
  }

  ngOnInit(): void {
    this.vehicleService.getCompaniesVehicles(this.roleService.getCompanyID()).pipe(first()).subscribe(s => {
      this.vehicles = s;
    });
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }

  enableInputs(): void {
    this.inputsDisabled = false;
  }

  updatePrevoznoSredstvo(form: NgForm): void {
    if (!form.valid)
      this.showToast('Greška', 'Informacije koje ste uneli nisu tačne!', 'danger');
    else {
      this.vehicles.forEach(p => this.vehicleService.updateVehicle(p, p._id).subscribe(x => {
      }));
      this.showToast('Uspeh', 'Uspešno ste izmenili informacije!', 'success');
      this.inputsDisabled = true;
      // When korisnik data is changed it has to generate a new token!
    }
  }

  private showToast(title: String, message: String, status: NbComponentStatus) {
    this.toastrService.show(
      message,
      title,
      {status});
  }

}
