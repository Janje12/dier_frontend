import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

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
  loading: boolean = true;

  constructor() {

  }

  ngOnInit(): void {
    if (this.name !== 'trash_stats')
      this.loading = false;
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
        title: `Najčešće ${titleType} otpad`,
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
      unfinished_operations: {
        title: 'Nedovršene operacije',
      },
    };
  }

  isLoaded() {
    this.loading = false;
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
