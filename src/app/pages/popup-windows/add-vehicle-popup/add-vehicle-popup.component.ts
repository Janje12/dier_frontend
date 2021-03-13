import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { getDeepFromObject, NB_AUTH_OPTIONS } from '@nebular/auth';
import { Vehicle } from '../../../@core/data/vehicle';
import { RoleService } from '../../../@core/service/role.service';
import { VehicleService } from '../../../@core/service/vehicle.service';

@Component({
  selector: 'add-vehicle-popup',
  templateUrl: './add-vehicle-popup.component.html',
  styleUrls: ['./add-vehicle-popup.component.css'],
})
export class AddVehiclePopupComponent implements OnInit {
  @Output() updateVehicles: EventEmitter<string> = new EventEmitter<string>();

  vehicle: Vehicle = {licensePlate: '', type: ''};

  constructor(private vehicleService: VehicleService, @Inject(NB_AUTH_OPTIONS) protected options = {},
              private roleService: RoleService) {
  }

  ngOnInit(): void {
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }

  addVehicle() {
    this.vehicleService.createVehicle(this.vehicle, this.roleService.getCompanyID()).subscribe(x => {});
    this.updateVehicles.emit('update');
  }

}
