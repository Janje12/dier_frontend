import { Component, OnInit } from '@angular/core';
import { NbAuthService } from '@nebular/auth';
import { first } from 'rxjs/operators';

import { MENU_ITEMS } from './pages-menu';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent implements OnInit {

  menu;
  rad_firme: string[];

  constructor(private authService: NbAuthService) {
  }

  ngOnInit(): void {
    this.authService.onTokenChange().pipe(first()).subscribe( x => {
      this.rad_firme = x.getPayload().data.firma.radFirme;
    });
    this.menu = MENU_ITEMS;
    this.menu = this.menu.slice(0, this.rad_firme.length + 3);
  }
}
