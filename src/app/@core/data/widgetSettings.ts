import { Observable } from 'rxjs';

export interface Widget {
  _id?: string;
  widgetTitle: string;
  widgetSize: string;
  widgetPosition: number;
}

export interface WidgetSettings {
  _id?: string;
  username: string;
  group: {
    groupTitle: string;
    groupType: string;
    groupColor: string;
    groupPosition: number;
    widgetList: Widget[];
  }[];
}

export abstract class WidgetSettingsData {
  abstract createWidgetSettings(WidgetSettings: WidgetSettings): Observable<WidgetSettings>;
  abstract getWidgetSettings(value: string, type: string): Observable<WidgetSettings>;
  abstract updateWidgetSettings(widgetSettings: WidgetSettings,
                                value: string, type: string): Observable<WidgetSettings>;
  abstract deleteWidgetSettings(value: string, type: string): Observable<WidgetSettings>;
}
