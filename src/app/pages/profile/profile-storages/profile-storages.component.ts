import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { getDeepFromObject, NB_AUTH_OPTIONS } from '@nebular/auth';
import { NbComponentStatus, NbToastrService } from '@nebular/theme';
import { first } from 'rxjs/operators';
import { Storage } from '../../../@core/data/storage';
import { RoleService } from '../../../@core/service/role.service';
import { StorageService } from '../../../@core/service/storage.service';

@Component({
  selector: 'profile-storages',
  templateUrl: './profile-storages.component.html',
  styleUrls: ['./profile-storages.component.scss'],
})
export class ProfileStoragesComponent implements OnInit {

  storages: Storage[] = [];
  inputsDisabled: boolean = true;

  constructor(private storageService: StorageService, private roleService: RoleService,
              @Inject(NB_AUTH_OPTIONS) protected options = {},
              private toastrService: NbToastrService) {
  }

  ngOnInit(): void {
    this.storageService.getCompaniesStorage('', this.roleService.getCompanyID()).pipe(first()).subscribe(s => {
      this.storages = s;
    });
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }

  enableInputs(): void {
    this.inputsDisabled = false;
  }

  updateStorage(form: NgForm): void {
    if (!form.valid)
      this.showToast('Greška', 'Informacije koje ste uneli nisu tačne!', 'danger');
    else {
      this.storages.forEach(s => this.storageService.updateStorage(s, s._id).subscribe(x => {
      }));
      this.showToast('Uspeh', 'Uspešno ste izmenili informacije!', 'success');
      this.inputsDisabled = true;
    }
  }

  private showToast(title: String, message: String, status: NbComponentStatus) {
    this.toastrService.show(
      message,
      title,
      {status});
  }

}
