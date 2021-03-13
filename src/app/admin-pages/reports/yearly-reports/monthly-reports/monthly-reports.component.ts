import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Company } from '../../../../@core/data/company';
import { MonthlyReport } from '../../../../@core/data/monthlyReport';
import { CompanyService } from '../../../../@core/service/company.service';
import { MonthlyReportService } from '../../../../@core/service/monthlyReportService';
import { MONTHLY_REPORTS_SETTINGS } from './monthlyReport.settings';

@Component({
  selector: 'monthly-reports',
  templateUrl: './monthly-reports.component.html',
  styleUrls: ['./monthly-reports.component.css'],
})
export class MonthlyReportsComponent implements OnInit {
  @Input() month: number;
  @Input() companyPIB: string;

  reports: MonthlyReport[] = [];
  private company: Company;
  settings: any = MONTHLY_REPORTS_SETTINGS;

  constructor(private reportService: MonthlyReportService, private router: Router,
              private companyService: CompanyService) {
  }

  ngOnInit(): void {
    this.reportService.getAllMesecniIzvestajFirme(this.companyPIB).subscribe(r => {
      this.reports = r.filter(x => x.month === this.month);
    });
    this.companyService.getCompany(this.companyPIB, 'pib').subscribe(c => {
      this.company = c;
    });
  }

  chooseAction(event: any) {
    if (event.action === 'moreInfo')
      this.reportInfo(event);
    if (event.action === 'yearlyReport')
      this.generateYearlyReport(event.data);
  }

  generateYearlyReport({otpad: trash}) {
    this.reportService.createGodisnjiIzvestaj(trash, 'PRODUCTION', this.company)
      .subscribe(data => this.downloadFile(data));
  }

  private reportInfo({data: report}) {
    this.router.navigate(['admin/izvestaji/mesecni-izvestaj', report._id]);
  }

  private downloadFile(data: Response) {
    // @ts-ignore
    const blob = new Blob([data], {type: 'application/pdf'});
    const url = window.URL.createObjectURL(blob);
    window.open(url);
  }
}
