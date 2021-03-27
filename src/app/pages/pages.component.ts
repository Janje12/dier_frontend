import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbAuthService } from '@nebular/auth';
import { NbMenuItem } from '@nebular/theme';
import { Subscription } from 'rxjs';
import { RoleService } from '../@core/service/role.service';

@Component({
  selector: 'pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent implements OnDestroy, OnInit {

  menu: NbMenuItem[];
  subscriber: Subscription;

  constructor(private roleService: RoleService, private authService: NbAuthService) {
    this.menu = [];
    this.authService.getToken().subscribe(t => {
      this.subscriber = this.roleService.getOperationsMenu().subscribe(x => {
        this.menu = x;
      });
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.menu = [];
  }

}
