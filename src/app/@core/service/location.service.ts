import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Location, LocationData } from '../data/location';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class LocationService extends LocationData {
  private readonly apiUrl: string;
  private townshipNames: Observable<string[]>;
  private townshipsIsLoaded: Boolean = false;

  constructor(private http: HttpClient) {
    super();
    this.apiUrl = environment.apiUrl;
  }

  createLocation(location: Location): Observable<Location> {
    return undefined;
  }

  deleteLocation(value: string, type: string): Observable<Location> {
    return undefined;
  }

  getLocation(value: string, type: string = '_id'): Observable<Location> {
    return this.http.get<Location>(this.apiUrl + '/api/location/one/' + `${type}/${value}`);
  }

  getLocations(value: string = 'all', type: string = '_id'): Observable<Location[]> {
    return this.http.get<Location[]>(this.apiUrl + '/api/location/many/' + `${type}/${value}`);
  }

  updateLocation(location: Location, value: string, type: string): Observable<Location> {
    return this.http.patch<Location>(this.apiUrl + '/api/location/one/' + `${type}/${value}`, location);
  }

  // Get all the distinct names of townships as an array of string
  getDistinctTownships(): Observable<string[]> {
    if (!this.townshipsIsLoaded) {
      this.townshipNames = this.http.get<string[]>(this.apiUrl + '/api/location/townships');
      this.townshipsIsLoaded = true;
    }
    return this.townshipNames;
  }

  // Get all the places that are located in that township
  getPlacesFromTownship(townshipName: string): Observable<string[]> {
    return this.http.get<string[]>(this.apiUrl + '/api/location/place/' + townshipName);
  }

  filter(value: string, arr: string[]): Observable<string[]> {
    const filterValue = value.toLowerCase();
    if (arr === undefined) return;
    return of(arr.filter(x => x.toLowerCase().includes(filterValue)));
  }


}
