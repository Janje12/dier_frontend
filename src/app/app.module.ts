import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {  NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NbDateFnsDateModule } from '@nebular/date-fns';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { RECAPTCHA_V3_SITE_KEY, RecaptchaFormsModule, RecaptchaV3Module } from 'ng-recaptcha';
import { CoreModule } from './@core/core.module';
import { RoleService } from './@core/service/role.service';
import { WidgetService } from './@core/service/widget.service';
import { ThemeModule } from './@theme/theme.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
} from '@nebular/theme';
import { AuthGuard } from './auth-guard.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NbDateFnsDateModule,
    NgxChartsModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    NbDateFnsDateModule.forRoot({format: 'dd/MM/yyyy'}),
    NbChatModule.forRoot({
      messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
    }),
    RecaptchaV3Module,
    RecaptchaFormsModule,
    CoreModule.forRoot(),
    ThemeModule.forRoot(),
  ],
  bootstrap: [AppComponent],
  providers: [AuthGuard, RoleService, WidgetService,
    {provide: RECAPTCHA_V3_SITE_KEY, useValue: '6LfTLXsaAAAAAAfTe6C2fFIrrgZSZ4MkKHa4ZtTP'}],
})
export class AppModule {
}
