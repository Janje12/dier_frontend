import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RoleService } from '../../../../@core/service/role.service';

@Component({
  selector: 'widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.css'],
})
export class WidgetComponent implements OnInit {
  @Output() updateSize: EventEmitter<string> = new EventEmitter<string>();
  @Output() updatePosition: EventEmitter<number> = new EventEmitter<number>();
  @Input() type: string;
  @Input() name: string;
  @Input() size: string;

  showSettings: boolean = false;
  widgetList: {};
  operations: {
    production: boolean, transport: boolean,
    collector: boolean, treatment: boolean, disposal: boolean, cache: boolean,
  };

  constructor(private roleService: RoleService) {

  }

  ngOnInit(): void {
    this.roleService.getOperations().subscribe(x => {
      this.operations = x;
    });
    let titleType = '';
    if (this.type === 'production')
      titleType = 'proizveden';
    else if (this.type === 'treatment')
      titleType = 'obrađen';
    else if (this.type === 'disposal')
      titleType = 'odložen';
    else if (this.type === 'cache')
      titleType = 'skladišćen';
    this.widgetList = {
      most_used_trash: {
        title: `Najčešći ${titleType} otpad`,
      },
      trash_stats: {
        title: 'Statistika otpada',
      },
      transport_vehicles: {
        title: 'Prevozna sredstva',
      },
      transport_permits: {
        title: 'Dozvole za transport',
      },
      collector_permits: {
        title: 'Dozvole za sakupljanje',
      },
      unfinished_operations: {
        title: 'Nedovršene operacije',
      },
      most_used_special_waste: {
        title: 'Najčešće korišćeni posebni tokovi otpada',
      },
      special_waste_stats: {
        title: 'Statistika posebnih tokova otpada',
      },
    };
  }

  getWidgetTitle(): string {
    return this.widgetList[this.name].title;
  }

  updateSizeMethod() {
    this.updateSize.emit(this.size);
  }

  updatePositionMethod(pos: number) {
    this.updatePosition.emit(pos);
  }
}
