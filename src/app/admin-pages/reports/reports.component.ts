import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbComponentStatus, NbToastrService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { CompanyService } from '../../@core/service/company.service';
import { COMPANY_REPORTS_SETTINGS } from './reportsTable.settings';

@Component({
  selector: 'ngx-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent implements OnInit {

  companySource: LocalDataSource = new LocalDataSource();
  companySettings: any = COMPANY_REPORTS_SETTINGS;

  constructor(private firmaService: CompanyService, private toastrService: NbToastrService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.firmaService.getCompanys('', '').subscribe(f => {
      this.companySource.load(f);
    });
  }

  private showToast(title: String, message: String, status: NbComponentStatus) {
    this.toastrService.show(
      message,
      title,
      {status});
  }

  companyReports(e: any) {
    if (e.action === 'one report')
      this.gotoCompanyReport(e);
    else if (e.action === 'all reports')
      this.gotoAllReports(e);
  }

  private gotoCompanyReport({data: company}) {
    this.router.navigate(['admin/izvestaji/firme/', company.pib]);
  }

  private gotoAllReports({data: company}) {
    this.router.navigate(['admin/izvestaji/godisnji-izvestaji/', company.pib]);
  }

}

