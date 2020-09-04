import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbComponentStatus, NbToastrService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { SkladisteService } from '../../@core/service/skladiste.service';
import { STORAGE_SETTINGS } from './storageTable.settings';

@Component({
  selector: 'ngx-storages',
  templateUrl: './storages.component.html',
  styleUrls: ['./storages.component.scss'],
})
export class StoragesComponent implements OnInit {

  storageSource: LocalDataSource = new LocalDataSource();
  storageSettings: any = STORAGE_SETTINGS;

  constructor(private skladisteService: SkladisteService, private toastrService: NbToastrService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.skladisteService.getSkladiste().subscribe(s => {
      // Fix popunjenost
      // @ts-ignore
      s.forEach(x => x.popunjenost = ((x.kolicina / x.maxKolicina) * 100).toFixed(0));
      this.storageSource.load(s);
    });
  }

  private showToast(title: String, message: String, status: NbComponentStatus) {
    this.toastrService.show(
      message,
      title,
      {status});
  }

  // TOASTR SERVICE THAT WORKS OFF OF the API!
  createStorage({newData: storage, confirm: confirm}): void {
    try {
      this.skladisteService.createSkladiste(storage).subscribe(s => {
      });
      confirm.resolve();
      this.showToast('Uspeh!', 'Uspešno ste kreirali ' + storage.naziv, 'success');
    } catch (err) {
      confirm.reject();
      this.showToast('Greška!', 'Došlo je do greške do kreiranja ' + storage.naziv +
        '. Molimo vas pokušajte kasnije.', 'danger');
    }
  }

  updateStorage({newData: storage, confirm: confirm}): void {
    try {
      this.skladisteService.updateSkladiste(storage).subscribe(s => {
      });
      confirm.resolve();
      this.showToast('Uspeh!', 'Uspešno ste uredili ' + storage.naziv, 'success');
    } catch (err) {
      confirm.reject();
      this.showToast('Greška!', 'Došlo je do greške dok ste pokušali da promenite ' + storage.naziv +
        '. Molimo vas pokušajte kasnije.', 'danger');
    }
  }

  deleteStorage({data: storage, confirm: confirm}): void {
    try {
      this.skladisteService.deleteSkladiste(storage).subscribe(s => {
      });
      confirm.resolve();
      this.showToast('Uspeh!', 'Uspešno ste obrisali ' + storage.naziv, 'success');
    } catch (err) {
      confirm.reject();
      this.showToast('Greška!', 'Došlo je do greške dok ste pokušali da obrišete ' + storage.naziv +
        '. Molimo vas pokušajte kasnije.', 'danger');
    }
  }

  storageInfo({data: storage}): void {
    this.router.navigate(['admin/skladistа', storage._id]);
  }
}
