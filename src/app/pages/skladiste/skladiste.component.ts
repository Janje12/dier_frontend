import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NOtpadService } from '../../@core/service/notpad.service';
import { RoleService } from '../../@core/service/role.service';
import { SkladisteService } from '../../@core/service/skladiste.service';
import { Skladiste } from '../../@core/data/skladiste';
import { NOtpad } from '../../@core/data/notpad';
import { NbWindowService } from '@nebular/theme';
import { SKLADISTE_SETTINGS } from './skladiste-settings';

@Component({
  selector: 'ngx-skladiste',
  templateUrl: './skladiste.component.html',
  styleUrls: ['./skladiste.component.css'],
})
export class SkladisteComponent implements OnInit {

  operations: {
    exists: false,
    proizvodnja: false,
    transport: false,
    tretman: false,
    skladistenje: false,
    odlaganje: false,
  };

  constructor(private roleService: RoleService) {
  }

  ngOnInit() {
    this.roleService.findOperations().subscribe(x => {
      this.operations = x;
    });
  }

}
