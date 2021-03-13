import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { WidgetSettings, WidgetSettingsData } from '../data/widgetSettings';
import {
  DEFAULT_CACHE_WIDGETS, DEFAULT_COLLECTOR_WIDGETS,
  DEFAULT_DISPOSAL_WIDGETS,
  DEFAULT_PRODUCTION_WIDGETS, DEFAULT_SPECIAL_WASTE_WIDGETS,
  DEFAULT_TRANSPORT_WIDGETS,
  DEFAULT_TREATMENT_WIDGETS,
} from '../utils/widget-utils';

@Injectable()
export class WidgetService extends WidgetSettingsData implements OnDestroy {
  private readonly apiUrl: string;
  private widgetSettings: WidgetSettings;

  constructor(private http: HttpClient) {
    super();
    this.apiUrl = environment.apiUrl;
  }

  initDefaultWidgetSettings(operations: any, username: string): Observable<WidgetSettings> {
    this.widgetSettings = {group: [], username: username};
    if (operations.production)
      this.widgetSettings.group.push(DEFAULT_PRODUCTION_WIDGETS);
    if (operations.transport)
      this.widgetSettings.group.push(DEFAULT_TRANSPORT_WIDGETS);
    if (operations.collector)
      this.widgetSettings.group.push(DEFAULT_COLLECTOR_WIDGETS);
    if (operations.treatment)
      this.widgetSettings.group.push(DEFAULT_TREATMENT_WIDGETS);
    if (operations.disposal)
      this.widgetSettings.group.push(DEFAULT_DISPOSAL_WIDGETS);
    if (operations.cache)
      this.widgetSettings.group.push(DEFAULT_CACHE_WIDGETS);
    if (operations.specialWaste)
      this.widgetSettings.group.push(DEFAULT_SPECIAL_WASTE_WIDGETS);
    this.createWidgetSettings(this.widgetSettings).subscribe(x => {
    });
    return of(this.widgetSettings);
  }

  createWidgetSettings(widgetSettings: WidgetSettings): Observable<WidgetSettings> {
    return this.http.post<WidgetSettings>(this.apiUrl + '/api/widget', {widgetSettings: widgetSettings});
  }

  deleteWidgetSettings(value: string, type: string): Observable<WidgetSettings> {
    return this.http.delete<WidgetSettings>(this.apiUrl + '/api/widget/one/' + `${type}/${value}`);
  }

  getWidgetSettings(value: string, operations: any, type: string = 'username'): Observable<WidgetSettings> {
    return this.http.get<WidgetSettings>(this.apiUrl + '/api/widget/one/' + `${type}/${value}`);
  }

  updateWidgetSettings(widgetSettings: WidgetSettings, value: string, type: string = '_id'):
    Observable<WidgetSettings> {
    return this.http.patch<WidgetSettings>(this.apiUrl + '/api/widget/one/' + `${type}/${value}`, widgetSettings);
  }

  ngOnDestroy(): void {
    this.widgetSettings = undefined;
  }

}
