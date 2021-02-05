import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DnevniIzvestaj } from '../../../@core/data/dnevniIzvestaj';
import { MesecniIzvestaj } from '../../../@core/data/mesecniIzvestaj';
import { MesecniIzvestajService } from '../../../@core/service/mesecniIzvestaj.service';
import { DAILY_REPORTS_SETTINGS } from './dailyReports.settings';

@Component({
  selector: 'monthly-report-information',
  templateUrl: './monthly-report-information.component.html',
  styleUrls: ['./monthly-report-information.component.css'],
})
export class MonthlyReportInformationComponent implements OnInit {

  settings: any = DAILY_REPORTS_SETTINGS;
  report: MesecniIzvestaj;
  dailyReports: DnevniIzvestaj[];

  constructor(private route: ActivatedRoute, private reportService: MesecniIzvestajService) {
    this.report = {
      _id: '',
      dnevniIzvestaj: [],
      godina: 0,
      mesec: 0,
      otpad: {
        name: '',
        indexNumber: '',
        packaging: '',
        qList: '',
        desc: '',
        amount: 0,
      },
      skladiste: {
         name: '',
        maxAmount: 0,
        amount: 0,
        address: undefined,
      },
      ukupnoProizvodnja: 0,
      ukupnoStanje: 0,
      ukupnoTransport: 0,
    };
  }

  ngOnInit(): void {
    const reportID = this.route.snapshot.paramMap.get('id');
    this.reportService.getOneMonthlyReport(reportID).subscribe(r => {
      this.report = r;
      this.dailyReports = this.report.dnevniIzvestaj;
    });
  }

}
