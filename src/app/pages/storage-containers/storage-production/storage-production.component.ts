import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { NbComponentStatus, NbToastrService, NbWindowRef, NbWindowService } from '@nebular/theme';
import { Observable, of } from 'rxjs';
import { Storage } from '../../../@core/data/storage';
import { Trash } from '../../../@core/data/trash';
import { TrashService } from '../../../@core/service/trash.service';
import { StorageService } from '../../../@core/service/storage.service';
import { STORAGE_EDIT_SETTINGS } from '../storage-edit.settings';
import { STORAGE_PRODUCTION_SETTINGS } from './storage-production.settings';

@Component({
  selector: 'storage-production',
  templateUrl: './storage-production.component.html',
  styleUrls: ['./storage-production.component.scss'],
})
export class StorageProductionComponent implements OnInit {
  @ViewChild('addTrashTemplate', {read: TemplateRef}) addTrashTemplate: TemplateRef<HTMLElement>;
  private windowRef: NbWindowRef;

  @Input() storage: Storage[];
  storage$: Observable<Storage[]>;
  selectedStorage: Storage;
  @Output() updateStorageEvent = new EventEmitter<string>();
  selectedTrash: Trash;

  settings: any = STORAGE_PRODUCTION_SETTINGS;
  currentSettings: any = this.settings;
  editSettings: any = STORAGE_EDIT_SETTINGS;
  editIcon: string = 'edit';

  constructor(private storageService: StorageService, private windowService: NbWindowService,
              private trashService: TrashService, private toastrService: NbToastrService) {
  }

  ngOnInit() {
    console.log(this.storage);
    this.storage$ = of(this.storage);
  }

  updateStorage(): void {
    this.updateStorageEvent.emit();
    this.storage$ = of(this.storage);
  }

  edit(): void {
    if (this.currentSettings !== this.editSettings) {
      this.currentSettings = this.editSettings;
      this.editIcon = 'close';
    } else {
      this.currentSettings = this.settings;
      this.editIcon = 'edit';
    }
  }

  chooseAction(event: any, storage: Storage) {
    this.selectedStorage = storage;
    if (event.action === 'add')
      this.openAddTrashWindow(event.data);
  }

  private openAddTrashWindow(trash: Trash) {
    this.selectedTrash = trash;
    this.windowRef = this.windowService.open(this.addTrashTemplate,
      {title: 'Dodaj proizvedenu kolicinu: ' + this.selectedTrash.name});
  }

  addTrashMethod({trashAmmount: trashAmmount}) {
    this.selectedTrash.amount += trashAmmount;
    this.trashService.updateTrash(this.selectedTrash, this.selectedStorage._id, this.selectedTrash._id).subscribe(x => {
      this.updateStorage();
    });
    this.showToast('Uspeh',
      'Uspešno ste dodali ' + trashAmmount + ' (kg) ' + this.selectedTrash.name + ' na skladište.',
      'success');
    this.windowRef.close();
    trashAmmount = NaN;
  }

  updateTrash({newData: trash, confirm: confirm}, storage: Storage): void {
    this.selectedStorage = storage;
    try {
      this.trashService.updateTrash(trash, this.selectedStorage._id, this.selectedTrash._id).subscribe(x => {
        this.updateStorage();
      });
      confirm.resolve();
      this.showToast('Uspeh!', 'Uspešno ste uredili ' + trash.name, 'success');
    } catch (err) {
      confirm.reject();
      this.showToast('Greška!', 'Došlo je do greške dok ste pokušali da promenite ' + trash.name +
        '. Molimo vas pokušajte kasnije.', 'danger');
    }
  }

  deleteTrash({data: trash, confirm: confirm}, storage: Storage): void {
    this.selectedStorage = storage;
    if (!window.confirm('Da li ste sigurni da želite da obrišete ' + trash.name + '?'))
      return;
    try {
        this.trashService.deleteTrash(this.selectedStorage._id, trash._id).subscribe(x => {
          this.updateStorage();
        });
      confirm.resolve();
      this.showToast('Uspeh!', 'Uspešno ste obrisali ' + trash.naziv, 'success');
    } catch (err) {
      confirm.reject();
      this.showToast('Greška!', 'Došlo je do greške dok ste pokušali da obrišete ' + trash.naziv +
        '. Molimo vas pokušajte kasnije.', 'danger');
    }
  }

  private showToast(title: String, message: String, status: NbComponentStatus) {
    this.toastrService.show(
      message,
      title,
      {status});
  }
}
