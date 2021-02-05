import { Observable } from 'rxjs';

export interface Location {
  _id?: string;
  townshipCode: number;
  townshipName: string;
  placeCode: number;
  placeName: string;
  zipCode: string;
}

export abstract class LocationData {
  abstract createLocation(location: Location): Observable<Location>;
  abstract getLocation(value: string, type: string): Observable<Location>;
  abstract getLocations(value: string, type: string): Observable<Location[]>;
  abstract updateLocation(location: Location, value: string, type: string): Observable<Location>;
  abstract deleteLocation(value: string, type: string): Observable<Location>;

}
