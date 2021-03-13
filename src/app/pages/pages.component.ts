import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbAuthService } from '@nebular/auth';
import { NbMenuItem } from '@nebular/theme';
import { Observable, Subscription } from 'rxjs';
import { RoleService } from '../@core/service/role.service';

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
export class PagesComponent implements OnDestroy, OnInit {

  menu: NbMenuItem[] = [];
  subsrciber: Subscription;

  constructor(private roleService: RoleService, private authService: NbAuthService) {
    this.authService.getToken().subscribe(t => {
      const companyOperations = t.getPayload().data.company.operations;
      this.subsrciber = this.roleService.getOperationsMenu(companyOperations).subscribe(x => {
        this.menu = x;
      });
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.menu = [];
    this.subsrciber.unsubscribe();
  }


}
