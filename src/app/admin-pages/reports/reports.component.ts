import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbComponentStatus, NbToastrService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { AdminService } from '../../@core/service/admin.service';
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

  constructor(private adminService: AdminService, private toastrService: NbToastrService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.adminService.getCompanies().subscribe(f => {
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
    this.router.navigate(['admin/reports/company/', company.pib]);
  }

  private gotoAllReports({data: company}) {
    this.router.navigate(['admin/reports//', company.pib]);
  }

}

