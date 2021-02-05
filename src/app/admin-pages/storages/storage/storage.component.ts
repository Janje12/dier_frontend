import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { getDeepFromObject, NB_AUTH_OPTIONS } from '@nebular/auth';
import { NbComponentStatus, NbToastrService } from '@nebular/theme';
import { Company } from '../../../@core/data/company';
import { Trash } from '../../../@core/data/trash';
import { Storage, StorageDump } from '../../../@core/data/storage';
import { CompanyService } from '../../../@core/service/company.service';
import { TrashService } from '../../../@core/service/trash.service';
import { StorageService } from '../../../@core/service/storage.service';
import { STORAGE_EDIT_SETTINGS } from './storageEdit.settings';

@Component({
  selector: 'ngx-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.scss'],
})
export class StorageComponent implements OnInit {

  storage: StorageDump = {
    address: {location: undefined, street: ''}, amount: 0, maxAmount: 0, name: '', dumpType: '',
  };
  company: Company = {
    address: {location: undefined, street: ''},
    email: '',
    emailReception: '',
    legalRep: '',
    manager: '',
    mat: '',
    name: '',
    occupation: undefined,
    operations: [],
    pib: '',
    telephone: '',
  };
  settings: any = STORAGE_EDIT_SETTINGS;

  constructor(private route: ActivatedRoute, private skladisteService: StorageService,
              @Inject(NB_AUTH_OPTIONS) protected options = {},
              private toastrService: NbToastrService, private router: Router,
              private notpadService: TrashService, private firmaService: CompanyService) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.skladisteService.getStorage(id).subscribe(s => {
      this.storage = <StorageDump>s;
      /* Make the 'e' into 'a' so Backend can read it. DO FIX THIS tho */
      // @ts-ignore
      let type = this.storage.__t ? this.storage.__t : 'skladista';
      type = type.charAt(0).toLowerCase() + type.slice(1);
      type = type.substring(0, 8) + 'a' + type.slice(9);
      this.firmaService.getCompany(this.storage._id, type).subscribe(x => {
        this.company = x;
      });
    });
    this.updateSkladiste();

  }

  updateSkladiste(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.skladisteService.getStorage(id).subscribe(s => {
      this.storage = <StorageDump>s;
    });
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }

  updateStorage(form: NgForm): void {
    if (!form.valid)
      this.showToast('Greška', 'Informacije koje ste uneli nisu tačne!', 'danger');
    else {
      this.skladisteService.updateStorage(this.storage, this.storage._id).subscribe(u => {
      });
      this.showToast('Uspeh', 'Uspešno ste izmenili informacije!', 'success');
    }
  }

  private showToast(title: String, message: String, status: NbComponentStatus) {
    this.toastrService.show(
      message,
      title,
      {status});
  }

  updateTrash({newData: trash, confirm: confirm}, skladiste: Storage): void {
    try {
      this.notpadService.updateTrash(trash, skladiste._id, trash._id).subscribe(c => {
        this.updateSkladiste();
      });
      confirm.resolve();
      this.showToast('Uspeh!', 'Uspešno ste uredili ' + trash.naziv, 'success');
    } catch (err) {
      confirm.reject();
      this.showToast('Greška!', 'Došlo je do greške dok ste pokušali da promenite ' + trash.naziv +
        '. Molimo vas pokušajte kasnije.', 'danger');
    }
  }

  deleteTrash({data: trash, confirm: confirm}, skladiste: Storage): void {
    try {
      this.notpadService.deleteTrash(skladiste._id, trash._id).subscribe(c => {
        this.updateSkladiste();
      });
      confirm.resolve();
      this.showToast('Uspeh!', 'Uspešno ste obrisali ' + trash.naziv, 'success');
    } catch (err) {
      confirm.reject();
      this.showToast('Greška!', 'Došlo je do greške dok ste pokušali da obrišete ' + trash.naziv +
        '. Molimo vas pokušajte kasnije.', 'danger');
    }
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

  gotoCompany(): void {
    this.router.navigate(['admin/firme', this.company.pib]);
  }

}
