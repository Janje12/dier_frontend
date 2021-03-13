import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'input-trash-amount',
  templateUrl: './input-trash-amount.component.html',
  styleUrls: ['./input-trash-amount.component.css'],
})
export class InputTrashAmountComponent implements OnInit {
  @Input() storageAmountUnit: string = 'KG';

  storageUnits: string[] = ['KG', 'T'];
  constructor() {
  }

  ngOnInit(): void {
  }

  updateStorageUnits(trashState: string) {
    if (trashState === 'Tečno')
      this.storageUnits = ['L'];
    else if (trashState === 'Gasovito')
      this.storageUnits = ['M3'];
    else
      this.storageUnits = ['KG', 'T'];
    this.storageAmountUnit = this.storageUnits[0];
  }

}
