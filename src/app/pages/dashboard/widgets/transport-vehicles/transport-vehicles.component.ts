import { Component, OnInit } from '@angular/core';
import { Vehicle } from '../../../../@core/data/vehicle';
import { RoleService } from '../../../../@core/service/role.service';
import { VehicleService } from '../../../../@core/service/vehicle.service';
import { VEHICLES_SETTINGS } from './transport-vehicles.settings';

@Component({
  selector: 'widget-vehicles',
  templateUrl: './transport-vehicles.component.html',
  styleUrls: ['./transport-vehicles.component.css'],
})
export class TransportVehiclesComponent implements OnInit {

  settings: {} = VEHICLES_SETTINGS;
  vehicles: Vehicle[] = [];

  constructor(private vehicleService: VehicleService, private roleService: RoleService) { }

  ngOnInit(): void {
    this.vehicleService.getCompaniesVehicles(this.roleService.getCompanyID()).subscribe(v => {
      this.vehicles = v;
    });
  }

}
