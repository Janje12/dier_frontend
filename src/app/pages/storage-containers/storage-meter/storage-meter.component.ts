import { Component, Input, OnInit } from '@angular/core';
import { NbComponentStatus } from '@nebular/theme';
import { Storage } from '../../../@core/data/storage';

@Component({
  selector: 'storage-meter',
  templateUrl: './storage-meter.component.html',
  styleUrls: ['./storage-meter.component.css'],
})
export class StorageMeterComponent implements OnInit {
  @Input() storage: Storage;

  constructor() { }

  ngOnInit(): void {
  }

  calculateStatus(): NbComponentStatus {
    if ((this.storage.amount / this.storage.maxAmount) * 100 < 33)
      return 'success';
    else if ((this.storage.amount / this.storage.maxAmount) * 100 < 66)
      return 'warning';
    else
      return 'danger';
  }

  calculateValue(): number {
    return (this.storage.amount / this.storage.maxAmount) * 100;
  }

}
