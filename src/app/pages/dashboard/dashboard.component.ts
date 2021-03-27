import { Component, OnDestroy, OnInit } from '@angular/core';
import { Widget, WidgetSettings } from '../../@core/data/widgetSettings';
import { RoleService } from '../../@core/service/role.service';
import { WidgetService } from '../../@core/service/widget.service';
import { WIDGET_SIZES } from '../../@core/utils/widget-utils';

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {

  operations: { production: boolean, transport: boolean, treatment: boolean, disposal: boolean, cache: boolean };
  widgetSettings: WidgetSettings = {group: [], username: ''};
  WIDGET_SIZES = WIDGET_SIZES;

  constructor(private roleService: RoleService, private widgetService: WidgetService) {
  }

  ngOnInit() {
    this.roleService.getOperations().subscribe(o => {
      this.operations = o;
    });
    this.widgetService.getWidgetSettings(this.roleService.getUsername(), this.operations).subscribe(w => {
        this.widgetSettings = w;
        if (this.widgetSettings === null)
          this.widgetService.initDefaultWidgetSettings(this.operations,
            this.roleService.getUsername()).subscribe(t => {
            this.widgetSettings = t;
          });
      },
    );
  }

  updateSizeMethod(size: string, widget: Widget) {
    widget.widgetSize = size;
  }

  updateGroupPositionMethod(pos: number, widgetGroup) {
    const currentPos = widgetGroup.groupPosition;
    const newPos = currentPos + pos;
    if (newPos < 0 || newPos > this.widgetSettings.group.length - 1)
      return;
    widgetGroup.groupPosition = newPos;
    this.widgetSettings.group[newPos].groupPosition = currentPos;
    [this.widgetSettings.group[currentPos], this.widgetSettings.group[newPos]] =
      [this.widgetSettings.group[newPos], this.widgetSettings.group[currentPos]];
  }

  updateWidgetPositionMethod(pos: number, widget, widgetList) {
    const currentPos = widget.widgetPosition;
    const newPos = currentPos + pos;
    if (newPos < 0 || newPos > widgetList.length - 1)
      return;
    widget.widgetPosition = newPos;
    widgetList[newPos].widgetPosition = currentPos;
    [widgetList[currentPos], widgetList[newPos]] =
      [widgetList[newPos], widgetList[currentPos]];
  }

  ngOnDestroy(): void {
    this.widgetService.updateWidgetSettings(this.widgetSettings,
      this.widgetSettings.username, 'username').subscribe(x => {
    });
  }
}
