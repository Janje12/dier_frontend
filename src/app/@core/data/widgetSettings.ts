interface Widget {
  widgetTitle: string;
  widgetSize: string;
  widgetPosition: number;
}

export interface WidgetSettings {
  _id?: string;
  group: {
    groupTitle: string;
    groupType: string;
    groupColor: string;
    groupPosition: number;
    widgetList: Widget[];
  }[];
}

export abstract class WidgetSettingsData {

}
