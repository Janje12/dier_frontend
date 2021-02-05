import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Trash } from '../../../@core/data/trash';
import { D_TAGS, R_TAGS } from '../../../@core/utils/trash-utils';

@Component({
  selector: 'add-trash-popup',
  templateUrl: './add-trash-popup.component.html',
  styleUrls: ['./add-trash-popup.component.css'],
})
export class AddTrashPopupComponent implements OnInit {
  @Output() callAddTrash: EventEmitter<{ trashAmmount: number, documentNo: string, companyName: string }> =
    new EventEmitter<{ trashAmmount: number, documentNo: string, companyName: string }>();
  @Input() type: string;
  @Input() selectedTrash: Trash;
  documentNo: string;
  companyName: string;
  storageAmmountUnit: string = 'KG';
  trashAmmount: number;

  D_TAGS: string[] = D_TAGS;
  R_TAGS: string[] = R_TAGS;
  currentTags: string[] = this.type === 'disposal' ? D_TAGS : R_TAGS;

  constructor() {
  }

  ngOnInit(): void {
  }

  callAddTrashMethod(): void {
    if (this.storageAmmountUnit !== 'KG')
      this.trashAmmount *= 1000;
    this.callAddTrash.emit({
      trashAmmount: this.trashAmmount, companyName: this.companyName,
      documentNo: this.documentNo,
    });
  }

}
