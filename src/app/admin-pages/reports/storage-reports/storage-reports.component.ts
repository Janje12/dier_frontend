import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Trash } from '../../../@core/data/trash';
import { Storage } from '../../../@core/data/storage';
import { MesecniIzvestajService } from '../../../@core/service/mesecniIzvestaj.service';
import { StorageService } from '../../../@core/service/storage.service';
import { STORAGE_REPORTS_SETTINGS } from './storageReportTable.settings';

@Component({
  selector: 'ngx-storage-reports',
  templateUrl: './storage-reports.component.html',
  styleUrls: ['./storage-reports.component.scss'],
})
export class StorageReportsComponent implements OnInit {
  @Input() storageIDs: string[];
  @Input() type: string;

  storages: Storage[] = [];
  storageReportSettings: any = STORAGE_REPORTS_SETTINGS;

  constructor(private skladisteService: StorageService, private mesecniIzvestajService: MesecniIzvestajService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.storageReportSettings.trashProduction = null;
    this.storageIDs.forEach(x =>
      this.skladisteService.getStorage(x).subscribe(s => {
        this.storages.push(s);
      }));
  }

  private downloadFile(data: Response) {
    // @ts-ignore
    const blob = new Blob([data], {type: 'application/pdf'});
    const url = window.URL.createObjectURL(blob);
    window.open(url);
  }

  chooseAction(event: any, storage: Storage) {
    if (event.action === 'trashReport') {
      if (this.type === 'production')
        this.trashProudctionReport(event, storage);
      if (this.type === 'treatment')
        this.trashTreatmentReport(event, storage);
      if (this.type === 'dump')
        this.trashDumpReport(event, storage);
    }
    if (event.action === 'trashTransport' && this.type === 'production')
      this.trashTransportReport(event, storage);
  }

  trashProudctionReport({data: trash}, storage: Storage) {
    this.mesecniIzvestajService.createMesecniIzvestaj(trash, storage, 'PRODUCTION')
      .subscribe(data => this.downloadFile(data));
  }

  // fix this x)
  trashTreatmentReport({data: trash}, storage: Storage) {
    this.mesecniIzvestajService.createMesecniIzvestaj(trash, storage, 'TREATMENT')
      .subscribe(data => this.downloadFile(data));
  }

  trashDumpReport({data: trash}, storage: Storage) {
    this.mesecniIzvestajService.createMesecniIzvestaj(trash, storage, 'DUMP')
      .subscribe(data => this.downloadFile(data));
  }

  trashTransportReport({data: trash}, storage: Storage) {
    this.router.navigate(['admin/izvestaji/dko', {trash: trash._id, storage: storage._id}]);
  }

  allTrashReport(storage: Storage) {
    return;
  }

}
