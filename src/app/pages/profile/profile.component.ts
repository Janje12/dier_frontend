import { Component, OnInit } from '@angular/core';
import { RoleService } from '../../../@core/service/role.service';

@Component({
  selector: 'ngx-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  operations: any;

  constructor(private roleService: RoleService) {
  }
  
  ngOnInit(): void {
    this.roleService.findOperations().subscribe(x => {
      this.operations = x;
    });
  }

}
