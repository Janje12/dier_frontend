/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import {Component, OnInit} from '@angular/core';
import {AnalyticsService} from './@core/utils/analytics.service';
import { NbIconLibraries } from '@nebular/theme';

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {

  constructor(private analytics: AnalyticsService, private iconsLibrary: NbIconLibraries) {
    this.iconsLibrary.registerFontPack('font-awesome', { packClass: 'fa', iconClassPrefix: 'fa' });
    this.iconsLibrary.registerFontPack('regular', { packClass: 'far', iconClassPrefix: 'fa' });
    this.iconsLibrary.registerFontPack('solid', { packClass: 'fas', iconClassPrefix: 'fa' });
    this.iconsLibrary.setDefaultPack('font-awesome');
  }

  ngOnInit(): void {
    this.analytics.trackPageViews();
  }
}
