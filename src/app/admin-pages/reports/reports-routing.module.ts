import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanyReportsComponent } from './company-reports/company-reports.component';
import { MonthlyReportInformationComponent } from './monthly-report-information/monthly-report-information.component';
import { ReportsComponent } from './reports.component';
import { TrashTransportReportComponent } from './trash-transport-report/trash-transport-report.component';
import { YearlyReportsComponent } from './yearly-reports/yearly-reports.component';


const routes: Routes = [
  {
    path: '',
    component: ReportsComponent,
  },
  {
    path: 'company/:pib',
    component: CompanyReportsComponent,
  },
  {
    path: 'wmd',
    component: TrashTransportReportComponent,
  },
  {
    path: 'monthly-report/:id',
    component: MonthlyReportInformationComponent,
  },
  {
    path: 'yearly-report/:pib',
    component: YearlyReportsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportsRoutingModule { }
