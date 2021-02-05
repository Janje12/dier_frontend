import { Component, OnInit } from '@angular/core';
import { RoleService } from '../../@core/service/role.service';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  operations: { production: boolean, transport: boolean, treatment: boolean, cache: boolean, disposal: boolean };

  constructor(private roleService: RoleService) {
  }

  ngOnInit(): void {
    this.roleService.getOperations().subscribe(x => {
      this.operations = x;
    });
  }

}
