import { Component, OnInit } from '@angular/core';
import { NbAuthService } from '@nebular/auth';
import { NbMenuItem } from '@nebular/theme';
import { first } from 'rxjs/operators';
import { log } from 'util';
import { RoleService } from '../@core/service/role.service';

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

  menu: NbMenuItem[];

  constructor(private roleService: RoleService) {
  }

  ngOnInit(): void {
    this.roleService.findOperationsMenu().subscribe(m => {
      this.menu = m;
    });
  }

}
