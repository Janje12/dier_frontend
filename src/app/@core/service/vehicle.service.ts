import { HttpClient } from '@angular/common/http';
import { NbAuthService } from '@nebular/auth';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Vehicle, VehicleData } from '../data/vehicle';

@Injectable()
export class VehicleService extends VehicleData {
  private readonly apiUrl: string;

  constructor(private http: HttpClient) {
    super();
    this.apiUrl = environment.apiUrl;
  }

  createVehicle(vehicle: Vehicle, companyID: string): Observable<Vehicle> {
    return this.http.post<Vehicle>(this.apiUrl + '/api/vehicle', {vehicle: vehicle, companyID: companyID});
  }

  deleteVehicle(value: string, type: string): Observable<Vehicle> {
    return undefined;
  }

  getVehicle(value: string, type: string): Observable<Vehicle> {
    return this.http.get<Vehicle>(this.apiUrl + '/api/vehicle/one/' + `${type}/${value}`);
  }

  getVehicles(value: string = 'all', type: string): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(this.apiUrl + '/api/vehicle/many/' + `${type}/${value}`);
  }

  updateVehicle(vehicle: Vehicle, value: string, type: string = '_id'): Observable<Vehicle> {
    return this.http.patch<Vehicle>(this.apiUrl + '/api/vehicle/many/' + `${type}/${value}`, vehicle);
  }

  getCompaniesVehicles(companyID: string): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(this.apiUrl + '/api/company/vehicles/' + companyID);
  }

}
