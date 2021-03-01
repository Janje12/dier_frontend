import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbComponentStatus, NbToastrService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { first } from 'rxjs/operators';
import { Storage } from '../../@core/data/storage';
import { AdminService } from '../../@core/service/admin.service';
import { StorageService } from '../../@core/service/storage.service';
import { STORAGE_SETTINGS } from './storageTable.settings';

@Component({
  selector: 'admin-storages',
  templateUrl: './storages.component.html',
  styleUrls: ['./storages.component.scss'],
})
export class StoragesComponent implements OnInit {

  storages: Storage[];
  selectedStorages: LocalDataSource = new LocalDataSource();
  storageSettings: any = STORAGE_SETTINGS;
  companyNames: any[] = [];

  constructor(private storageService: StorageService, private toastrService: NbToastrService,
              private router: Router, private adminService: AdminService) {
  }

  ngOnInit(): void {
    this.adminService.getStorages().pipe(first()).subscribe(s => {
      // @ts-ignore
      s.forEach(x => x.capacity = ((x.amount / x.maxAmount) * 100).toFixed(0));
      this.storages = s;
      this.selectedStorages.load(s);
    });
    this.adminService.getCompanyNames('storages').subscribe(t => {
      this.companyNames = t;
    });
  }

  private showToast(title: String, message: String, status: NbComponentStatus) {
    this.toastrService.show(
      message,
      title,
      {status});
  }

  selectStorages(selectedCompany: any) {
    if (selectedCompany === '-') {
      this.selectedStorages.load(this.storages);
    } else {
      let tmp = this.storages;
      tmp = tmp.filter(f => selectedCompany.storages.includes(f._id));
      this.selectedStorages.load(tmp);
    }
  }

  // TOASTR SERVICE THAT WORKS OFF OF the API!
  createStorage({newData: storage, confirm: confirm}): void {
    try {
      this.storageService.createStorage(storage).subscribe(s => {
      });
      confirm.resolve();
      this.showToast('Uspeh!', 'Uspešno ste kreirali ' + storage.name, 'success');
    } catch (err) {
      confirm.reject();
      this.showToast('Greška!', 'Došlo je do greške do kreiranja ' + storage.name +
        '. Molimo vas pokušajte kasnije.', 'danger');
    }
  }

  updateStorage({newData: storage, confirm: confirm}): void {
    try {
      this.storageService.updateStorage(storage, storage._id).subscribe(s => {
      });
      confirm.resolve();
      this.showToast('Uspeh!', 'Uspešno ste uredili ' + storage.name, 'success');
    } catch (err) {
      confirm.reject();
      this.showToast('Greška!', 'Došlo je do greške dok ste pokušali da promenite ' + storage.name +
        '. Molimo vas pokušajte kasnije.', 'danger');
    }
  }

  deleteStorage({data: storage, confirm: confirm}): void {
    try {
      if (!window.confirm('Da li ste sigurni da želite da obrišete ' + storage.name + '?'))
        return;
      this.storageService.deleteStorage(storage._id).subscribe(s => {
      });
      confirm.resolve();
      this.showToast('Uspeh!', 'Uspešno ste obrisali ' + storage.name, 'success');
    } catch (err) {
      confirm.reject();
      this.showToast('Greška!', 'Došlo je do greške dok ste pokušali da obrišete ' + storage.name +
        '. Molimo vas pokušajte kasnije.', 'danger');
    }
  }

  storageInfo({data: storage}): void {
    this.router.navigate(['admin/storages', storage._id]);
  }
}
