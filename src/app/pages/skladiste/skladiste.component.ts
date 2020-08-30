import { Component, OnInit } from '@angular/core';
import { RoleService } from '../../@core/service/role.service';

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
