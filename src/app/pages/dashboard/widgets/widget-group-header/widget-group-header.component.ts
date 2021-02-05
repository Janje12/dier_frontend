import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'widget-group-header',
  templateUrl: './widget-group-header.component.html',
  styleUrls: ['./widget-group-header.component.css'],
})
export class WidgetGroupHeaderComponent implements OnInit {
  @Output() updatePosition: EventEmitter<number> = new EventEmitter<number>();
  @Input() title: string;
  @Input() status: string;
  showSettings: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  updatePositionMethod(pos: number) {
    this.updatePosition.emit(pos);
  }
}
