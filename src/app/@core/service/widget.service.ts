import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NbAuthService } from '@nebular/auth';
import { environment } from '../../../environments/environment';
import { WidgetSettings, WidgetSettingsData } from '../data/widgetSettings';
import {
  DEFAULT_CACHE_WIDGETS,
  DEFAULT_DISPOSAL_WIDGETS,
  DEFAULT_PRODUCTION_WIDGETS,
  DEFAULT_TRANSPORT_WIDGETS,
  DEFAULT_TREATMENT_WIDGETS,
} from '../utils/widget-utils';

@Injectable()
export class WidgetService extends WidgetSettingsData {
  private readonly apiUrl: string;
  private widgetSettings: WidgetSettings;

  constructor(private http: HttpClient, private authService: NbAuthService) {
    super();
    this.apiUrl = environment.apiUrl;
  }

  initializeWidgetSettings(operations: any): WidgetSettings {
    this.widgetSettings = {group: []};
    if (operations.production)
      this.widgetSettings.group.push(DEFAULT_PRODUCTION_WIDGETS);
    if (operations.transport)
      this.widgetSettings.group.push(DEFAULT_TRANSPORT_WIDGETS);
    if (operations.treatment)
      this.widgetSettings.group.push(DEFAULT_TREATMENT_WIDGETS);
    if (operations.disposal)
      this.widgetSettings.group.push(DEFAULT_DISPOSAL_WIDGETS);
    if (operations.cache)
      this.widgetSettings.group.push(DEFAULT_CACHE_WIDGETS);
    return this.widgetSettings;
  }

}
