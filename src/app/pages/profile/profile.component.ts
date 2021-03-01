import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoleService } from '../../@core/service/role.service';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  operations: { production: boolean, transport: boolean, treatment: boolean, cache: boolean, disposal: boolean };
  activeTab: string;

  constructor(private roleService: RoleService, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(params => {
      this.activeTab = params.activeTab;
    });
  }

  ngOnInit(): void {
    this.roleService.getOperations().subscribe(x => {
      this.operations = x;
    });
  }

}
