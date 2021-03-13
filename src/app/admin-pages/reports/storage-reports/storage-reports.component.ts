import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '../../../@core/data/storage';
import { AdminService } from '../../../@core/service/admin.service';
import { MonthlyReportService } from '../../../@core/service/monthlyReportService';
import { StorageService } from '../../../@core/service/storage.service';
import { STORAGE_REPORTS_SETTINGS } from './storageReportTable.settings';

@Component({
  selector: 'storage-reports',
  templateUrl: './storage-reports.component.html',
  styleUrls: ['./storage-reports.component.scss'],
})
export class StorageReportsComponent implements OnInit {
  @Input() companyPIB: string;
  @Input() type: string;

  storages: Storage[] = [];
  storageReportSettings: any = STORAGE_REPORTS_SETTINGS;

  constructor(private storageService: StorageService, private monthlyReportService: MonthlyReportService,
              private router: Router, private adminService: AdminService) {
  }

  ngOnInit(): void {
    this.adminService.getCompany(this.companyPIB, 'pib').subscribe(c => {
      this.storageService.getCompaniesStorage(c._id, this.type).subscribe(s => {
        this.storages = s;
      });
    });

  }

  private downloadFile(data: Response) {
    // @ts-ignore
    const blob = new Blob([data], {type: 'application/pdf'});
    const url = window.URL.createObjectURL(blob);
    window.open(url);
  }

  chooseAction(event: any, storage: Storage) {
    if (event.action === 'trashReport') {
      this.trashReport(event, storage);
    } else if (event.action === 'trashTransport' && this.type === 'production')
      this.trashTransportReport(event, storage);
  }

  trashReport({data: trash}, storage: Storage) {
    this.monthlyReportService.createMesecniIzvestaj(trash, storage, this.type.toUpperCase())
      .subscribe(data => this.downloadFile(data));
  }

  trashTransportReport({data: trash}, storage: Storage) {
    this.router.navigate(['admin/reports/wmd', {trash: trash._id, storage: storage._id}]);
  }

  allTrashReport(storage: Storage) {
    return;
  }

}
