import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
	NbButtonModule,
	NbCardModule,
	NbIconModule,
	NbInputModule,
	NbStepperModule,
	NbTabsetModule,
} from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ReportsRoutingModule } from './reports-routing.module';
import { ConfirmPartComponent } from './trash-transport-report/confirm-part/confirm-part.component';
import { YearlyReportsComponent } from './yearly-reports/yearly-reports.component';
import { MonthlyReportsComponent } from './yearly-reports/monthly-reports/monthly-reports.component';
import { MonthlyReportInformationComponent } from './monthly-report-information/monthly-report-information.component';


@NgModule({
  declarations: [ConfirmPartComponent, YearlyReportsComponent, MonthlyReportsComponent, MonthlyReportInformationComponent],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    NbButtonModule,
    NbIconModule,
    NbStepperModule,
    NbCardModule,
    NbTabsetModule,
    Ng2SmartTableModule,
    NbInputModule,
    FormsModule,
  ],
  exports: [
    ConfirmPartComponent,
  ],
})
export class ReportsModule { }
