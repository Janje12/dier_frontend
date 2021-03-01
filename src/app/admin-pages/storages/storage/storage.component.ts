import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { getDeepFromObject, NB_AUTH_OPTIONS } from '@nebular/auth';
import { NbComponentStatus, NbToastrService } from '@nebular/theme';
import { Company } from '../../../@core/data/company';
import { Storage, StorageDump } from '../../../@core/data/storage';
import { AdminService } from '../../../@core/service/admin.service';
import { TrashService } from '../../../@core/service/trash.service';
import { StorageService } from '../../../@core/service/storage.service';
import { STORAGE_EDIT_SETTINGS } from './storageEdit.settings';

@Component({
  selector: 'admin-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.scss'],
})
export class StorageComponent implements OnInit {

  storage: StorageDump = {address: {location: undefined, street: ''}, amount: 0, maxAmount: 0, name: '', dumpType: ''};
  company: Company;
  settings: any = STORAGE_EDIT_SETTINGS;

  constructor(private route: ActivatedRoute, private storageService: StorageService,
              @Inject(NB_AUTH_OPTIONS) protected options = {},
              private toastrService: NbToastrService, private router: Router,
              private trashService: TrashService, private adminService: AdminService) {
  }

  ngOnInit(): void {
   this.updateStorageView();
  }

  private updateStorageView() {
    const id = this.route.snapshot.paramMap.get('id');
    this.adminService.getStorage(id).subscribe(s => {
      this.storage = <StorageDump>s;
      this.adminService.getCompany(this.storage._id, 'storages').subscribe(x => {
        this.company = x;
      });
    });
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }

  updateStorage(form: NgForm): void {
    if (!form.valid)
      this.showToast('Greška', 'Informacije koje ste uneli nisu tačne!', 'danger');
    else {
      this.storageService.updateStorage(this.storage, this.storage._id).subscribe(u => {
      });
      this.showToast('Uspeh', 'Uspešno ste izmenili informacije!', 'success');
    }
  }


  updateTrash({newData: trash, confirm: confirm}, storage: Storage): void {
    try {
      this.trashService.updateTrash(trash, storage._id, trash._id).subscribe(c => {
        this.updateStorageView();
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
    try {
      this.trashService.deleteTrash(storage._id, trash._id).subscribe(c => {
        this.updateStorageView();
      });
      confirm.resolve();
      this.showToast('Uspeh!', 'Uspešno ste obrisali ' + trash.naziv, 'success');
    } catch (err) {
      confirm.reject();
      this.showToast('Greška!', 'Došlo je do greške dok ste pokušali da obrišete ' + trash.naziv +
        '. Molimo vas pokušajte kasnije.', 'danger');
    }
  }

  gotoCompany(): void {
    this.router.navigate(['admin/companies', this.company.pib]);
  }

  private showToast(title: String, message: String, status: NbComponentStatus) {
    this.toastrService.show(
      message,
      title,
      {status});
  }
}
