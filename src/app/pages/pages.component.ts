import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbAuthService } from '@nebular/auth';
import { NbMenuItem } from '@nebular/theme';
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

  constructor(private roleService: RoleService, private authService: NbAuthService,
              private router: Router) {
    this.authService.getToken().subscribe(t => {
      const user = t.getPayload().data.user;
      if (user.role === 'admin') {
        this.router.navigate(['admin']);
      }
    });
  }

  ngOnInit(): void {
    this.authService.getToken().subscribe(t => {
      const companyOperations = t.getPayload().data.company.operations;
      this.roleService.getOperationsMenu(companyOperations).subscribe(m => {
        this.menu = m;
      });
    });
  }

  ngOnDestroy(): void {
    this.menu = [];
  }


}
