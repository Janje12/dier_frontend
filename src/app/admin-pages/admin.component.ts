import { Component, OnInit } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';
import { ADMIN_MENU_ITEMS } from './admi-pages-menu';

@Component({
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {

  menu: NbMenuItem[] = ADMIN_MENU_ITEMS;

  constructor() {
  }

  ngOnInit(): void {
  }

}
