import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SpecialWaste } from '../../../@core/data/specialWaste';
import { SpecialWasteService } from '../../../@core/service/specialWaste.service';

@Component({
  selector: 'add-special-waste-popup',
  templateUrl: './add-special-waste-popup.component.html',
  styleUrls: ['./add-special-waste-popup.component.css'],
})
export class AddSpecialWastePopupComponent implements OnInit {
  @Input() type: string;
  @Input() selectedSpecialWaste: SpecialWaste;
  @Output() exitEmitter: EventEmitter<string> = new EventEmitter<string>();
  specialWasteAmount: number = 0;

  constructor(private specialWasteService: SpecialWasteService) {
  }

  ngOnInit(): void {
  }

  addSpecialWaste() {
    if (this.type === 'export')
      this.specialWasteAmount *= -1;
    this.specialWasteService.updateSpecialWaste
    (this.selectedSpecialWaste, this.type, this.specialWasteAmount, this.selectedSpecialWaste._id).subscribe(x => {
        this.exitEmitter.emit('');
      },
    );
  }
}
