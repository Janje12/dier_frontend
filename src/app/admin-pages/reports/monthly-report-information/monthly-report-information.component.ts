import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DailyReport } from '../../../@core/data/dailyReport';
import { MonthlyReport } from '../../../@core/data/monthlyReport';
import { MonthlyReportService } from '../../../@core/service/monthlyReportService';
import { DAILY_REPORTS_SETTINGS } from './dailyReports.settings';

@Component({
  selector: 'monthly-report-information',
  templateUrl: './monthly-report-information.component.html',
  styleUrls: ['./monthly-report-information.component.css'],
})
export class MonthlyReportInformationComponent implements OnInit {

  settings: any = DAILY_REPORTS_SETTINGS;
  report: MonthlyReport;
  dailyReports: DailyReport[];

  constructor(private route: ActivatedRoute, private reportService: MonthlyReportService) {
    this.report = {
      _id: '',
      dailyReport: [],
      month: 0,
      storage: undefined,
      total: 0,
      totalProduction: 0,
      totalTransport: 0,
      trash: undefined,
      year: 0,
    };
  }

  ngOnInit(): void {
    const reportID = this.route.snapshot.paramMap.get('id');
    this.reportService.getOneMonthlyReport(reportID).subscribe(r => {
      this.report = r;
      this.dailyReports = this.report.dailyReport;
    });
  }

}
