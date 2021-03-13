import { NgModule } from '@angular/core';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbUserModule,
  NbIconModule, NbSelectModule, NbSpinnerModule, NbAccordionModule, NbTabsetModule,
} from '@nebular/theme';
import { BarChartModule } from '@swimlane/ngx-charts';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgxEchartsModule } from 'ngx-echarts';
import { RoleService } from '../../@core/service/role.service';
import { WidgetService } from '../../@core/service/widget.service';
import { ThemeModule } from '../../@theme/theme.module';
import { PopupWindowsModule } from '../popup-windows/popup-windows.module';
import { DashboardComponent } from './dashboard.component';
import { FormsModule } from '@angular/forms';
import { WidgetComponent } from './widgets/widget/widget.component';
import { MostUsedTrashComponent } from './widgets/most-used-trash/most-used-trash.component';
import { TrashStatsComponent } from './widgets/trash-stats/trash-stats.component';
import { TransportPermitsComponent } from './widgets/transport-permits/transport-permits.component';
import { TransportVehiclesComponent } from './widgets/transport-vehicles/transport-vehicles.component';
import { UnfinishedOperationsComponent } from './widgets/unfinished-operations/unfinished-operations.component';
import { WidgetGroupHeaderComponent } from './widgets/widget-group-header/widget-group-header.component';
import { MostUsedSpecialWasteComponent } from './widgets/most-used-special-waste/most-used-special-waste.component';
import { SpecialWasteStatsComponent } from './widgets/special-waste-stats/special-waste-stats.component';

@NgModule({
  imports: [
    FormsModule,
    ThemeModule,
    NbCardModule,
    NbUserModule,
    NbButtonModule,
    NbActionsModule,
    NbIconModule,
    NbButtonModule,
    NgxEchartsModule,
    PopupWindowsModule,
    NbSelectModule,
    NbSpinnerModule,
    NbAccordionModule,
    Ng2SmartTableModule,
    BarChartModule,
    NbTabsetModule,
  ],
  declarations: [
    DashboardComponent,
    WidgetComponent,
    MostUsedTrashComponent,
    TrashStatsComponent,
    TransportPermitsComponent,
    TransportVehiclesComponent,
    UnfinishedOperationsComponent,
    WidgetGroupHeaderComponent,
    MostUsedSpecialWasteComponent,
    SpecialWasteStatsComponent,
  ],
  providers: [],
})
export class DashboardModule {
}
