import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { MonthlyReportService } from '../../../@core/service/monthlyReportService';

@Component({
  selector: 'yearly-reports',
  templateUrl: './yearly-reports.component.html',
  styleUrls: ['./yearly-reports.component.css'],
})
export class YearlyReportsComponent implements OnInit {

  months: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Avg', 'Sep', 'Okt', 'Nov', 'Dec'];
  months$: Observable<string[]>;
  currMonth: number = 0;
  companyPIB: string = '';

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.companyPIB = this.route.snapshot.paramMap.get('pib');
    this.months$ = of(this.months);
    this.currMonth = new Date().getMonth();
  }

}
