import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { NbWindowRef, NbWindowService } from '@nebular/theme';
import { Observable, of } from 'rxjs';
import { Trash } from '../../../@core/data/trash';
import { StorageCache } from '../../../@core/data/storage';
import { ToastrService } from '../../../@core/service/toastr.service';
import { TrashService } from '../../../@core/service/trash.service';
import { StorageService } from '../../../@core/service/storage.service';
import { STORAGE_EDIT_SETTINGS } from '../storage-edit.settings';
import { STORAGE_PRODUCTION_SETTINGS } from '../storage-production/storage-production.settings';

@Component({
  selector: 'storage-cache',
  templateUrl: './storage-cache.component.html',
  styleUrls: ['./storage-cache.component.scss'],
})
export class StorageCacheComponent implements OnInit {
  @ViewChild('addTrashTemplate', {read: TemplateRef}) addTrashTemplate: TemplateRef<HTMLElement>;
  private windowRef: NbWindowRef;

  @Input() storageCache: StorageCache[];
  storageCache$: Observable<StorageCache[]>;
  selectedStorageCache: StorageCache;
  @Output() updateStorageEvent = new EventEmitter<string>();
  selectedTrash: Trash;

  settings: any = STORAGE_PRODUCTION_SETTINGS;
  currentSettings: any = this.settings;
  editSettings: any = STORAGE_EDIT_SETTINGS;
  editIcon: string = 'edit';

  constructor(private storageService: StorageService, private windowService: NbWindowService,
              private trashService: TrashService, private toastrService: ToastrService) {
  }

  ngOnInit() {
    this.storageCache$ = of(this.storageCache);
  }

  updateStorage(): void {
    this.updateStorageEvent.emit();
    this.storageCache$ = of(this.storageCache);
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

  chooseAction(event: any, storage: StorageCache) {
    this.selectedStorageCache = storage;
    if (event.action === 'add')
      this.openAddTrashWindow(event.data);
  }

  private openAddTrashWindow(trash: Trash) {
    this.selectedTrash = trash;
    this.windowRef = this.windowService.open(this.addTrashTemplate,
      {title: 'Dodaj proizvedenu kolicinu: ' + this.selectedTrash.name});
  }

  addTrashMethod({trashAmmount: trashAmmount}) {
    if (this.selectedStorageCache.amount - trashAmmount < 0) {
      this.toastrService.showToast('Greška', 'Ne možete da dodate obradite više otpada nego što vaše skladište ima: '
        + this.selectedStorageCache.amount + ' ' + this.selectedStorageCache.storageUnit, 'warning');
      return;
    }
    this.selectedTrash.amount += trashAmmount;
    this.trashService.updateTrash(this.selectedTrash, this.selectedStorageCache._id, this.selectedTrash._id).
    subscribe(x => {
      this.updateStorage();
    });
    this.toastrService.showToast('Uspeh', 'Uspešno ste dodali ' + trashAmmount + ' (kg) ' + this.selectedTrash.name + ' na skladište.',
      'success');
    this.windowRef.close();
    trashAmmount = NaN;
  }

  updateTrash({newData: trash, confirm: confirm}, storage: StorageCache): void {
    this.selectedStorageCache = storage;
    try {
      this.trashService.updateTrash(trash, this.selectedStorageCache._id, trash._id).subscribe(x => {
        this.updateStorage();
      });
      confirm.resolve();
      this.toastrService.showToast('Uspeh!', 'Uspešno ste uredili ' + trash.name, 'success');
    } catch (err) {
      confirm.reject();
      this.toastrService.showToast('Greška!', 'Došlo je do greške dok ste pokušali da promenite ' + trash.name +
        '. Molimo vas pokušajte kasnije.', 'danger');
    }
  }

  deleteTrash({data: trash, confirm: confirm}, storage: StorageCache): void {
    this.selectedStorageCache = storage;
    if (!window.confirm('Da li ste sigurni da želite da obrišete ' + trash.naziv + '?'))
      return;
    try {
      this.trashService.deleteTrash(this.selectedStorageCache._id, trash._id).subscribe(x => {
        this.updateStorage();
      });
      confirm.resolve();
      this.toastrService.showToast('Uspeh!', 'Uspešno ste obrisali ' + trash.name, 'success');
    } catch (err) {
      confirm.reject();
      this.toastrService.showToast('Greška!', 'Došlo je do greške dok ste pokušali da obrišete ' + trash.name +
        '. Molimo vas pokušajte kasnije.', 'danger');
    }
  }

}
