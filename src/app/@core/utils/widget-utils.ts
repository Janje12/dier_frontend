export const WIDGET_SIZES: {} = {
  tiny: 'col-3',
  small: 'col-4',
  medium: 'col-6',
  large: 'col-8',
  giant: 'col-12',
};

export const DEFAULT_PRODUCTION_WIDGETS = {
  groupPosition: 0,
  groupTitle: 'PROIZVODNJA',
  groupColor: 'danger',
  groupType: 'production',
  widgetList:
    [
      {
        widgetTitle: 'most_used_trash',
        widgetSize: 'medium',
        widgetPosition: 0,
      },
      {
        widgetPosition: 1,
        widgetSize: 'medium',
        widgetTitle: 'trash_stats',
      },
    ],
};
export const DEFAULT_TRANSPORT_WIDGETS = {
  groupPosition: 0,
  groupTitle: 'TRANSPORT',
  groupColor: 'info',
  groupType: 'transport',
  widgetList:
    [
      {
        widgetTitle: 'transport_permits',
        widgetSize: 'medium',
        widgetPosition: 0,
      },
      {
        widgetTitle: 'transport_vehicles',
        widgetSize: 'medium',
        widgetPosition: 1,
      },
    ],
};
export const DEFAULT_TREATMENT_WIDGETS = {
  groupPosition: 0,
  groupTitle: 'TRETMAN',
  groupColor: 'primary',
  groupType: 'treatment',
  widgetList:
    [
      {
        widgetTitle: 'trash_stats',
        widgetSize: 'giant',
        widgetPosition: 0,
      },
      {
        widgetTitle: 'most_used_trash',
        widgetSize: 'medium',
        widgetPosition: 1,
      },

      {
        widgetTitle: 'unfinished_operations',
        widgetSize: 'medium',
        widgetPosition: 2,
      },
    ],
};
export const DEFAULT_DISPOSAL_WIDGETS = {
  groupPosition: 0,
  groupTitle: 'ODLAGANEJE',
  groupColor: 'warning',
  groupType: 'disposal',
  widgetList:
    [
      {
        widgetTitle: 'most_used_trash',
        widgetSize: 'medium',
        widgetPosition: 0,
      },
      {
        widgetTitle: 'trash_stats',
        widgetSize: 'medium',
        widgetPosition: 1,
      },
      {
        widgetTitle: 'unfinished_operations',
        widgetSize: 'medium',
        widgetPosition: 2,
      },
    ],
};
export const DEFAULT_CACHE_WIDGETS = {
  groupPosition: 0,
  groupTitle: 'SKLADIŠTENJE',
  groupColor: 'basic',
  groupType: 'cache',
  widgetList:
    [
      {
        widgetTitle: 'most_used_trash',
        widgetSize: 'medium',
        widgetPosition: 0,
      },
      {
        widgetTitle: 'trash_stats',
        widgetSize: 'medium',
        widgetPosition: 1,
      },
    ],
};
