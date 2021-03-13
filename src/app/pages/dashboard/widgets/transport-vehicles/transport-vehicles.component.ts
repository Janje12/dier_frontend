import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NbWindowRef, NbWindowService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
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
  @ViewChild('addVehicleTemplate', {read: TemplateRef}) addVehicleTemplate: TemplateRef<HTMLElement>;
  private windowRef: NbWindowRef;

  settings: {} = VEHICLES_SETTINGS;
  vehicles: LocalDataSource = new LocalDataSource();

  constructor(private vehicleService: VehicleService, private roleService: RoleService,
              private windowService: NbWindowService) {
  }

  ngOnInit(): void {
    this.updateVehicles();
  }

  updateVehicles() {
    this.vehicleService.getCompaniesVehicles(this.roleService.getCompanyID()).subscribe(v => {
      this.vehicles.load(v);
    });
    if (this.windowRef !== undefined)
      this.windowRef.close();
  }

  openAddVehicleWindow() {
    this.windowRef = this.windowService.open(this.addVehicleTemplate, {title: 'Dodajte vozilo'});
  }

}
