import { Observable } from 'rxjs';

export interface Vehicle {
  _id?: string;
  type: string;
  licensePlate: string;
  licensePlateExpiration?: Date;
}

export abstract class VehicleData {
  abstract createVehicle(vehicle: Vehicle): Observable<Vehicle>;
  abstract getVehicle(value: string, type: string): Observable<Vehicle>;
  abstract getVehicles(value: string, type: string): Observable<Vehicle[]>;
  abstract updateVehicle(vehicle: Vehicle, value: string, type: string): Observable<Vehicle>;
  abstract deleteVehicle(value: string, type: string): Observable<Vehicle>;
}
