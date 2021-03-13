import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbComponentStatus, NbToastrService } from '@nebular/theme';
import { Company } from '../../../@core/data/company';
import { Storage } from '../../../@core/data/storage';
import { AdminService } from '../../../@core/service/admin.service';
import { RoleService } from '../../../@core/service/role.service';

@Component({
  selector: 'company-reports',
  templateUrl: './company-reports.component.html',
  styleUrls: ['./company-reports.component.scss'],
})
export class CompanyReportsComponent implements OnInit {

  storageIDs: string[];
  company: Company = {
    address: {location: undefined, street: ''},
    email: '',
    emailReception: '',
    legalRep: { firstName: '', lastName: ''},
    nriz: { username: '', password: ''},
    manager: '',
    mat: '',
    name: '',
    occupation: undefined,
    operations: [],
    pib: '',
    telephone: '',
  };
  storages: Storage[];
  operations: {
    production: boolean,
    transport: boolean, treatment: boolean,
    cache: boolean, disposal: boolean,
    collector: boolean,
    specialWaste: boolean,
  };
  pib: string;

  constructor(private route: ActivatedRoute, private adminService: AdminService,
              private toastrService: NbToastrService, private roleService: RoleService) {
  }

  ngOnInit(): void {
    this.pib = this.route.snapshot.paramMap.get('pib');
    this.adminService.getCompany(this.pib, 'pib').subscribe(c => {
      this.company = c;
      this.roleService.getOperations(this.company.operations).subscribe(o => {
        this.operations = o;
      });
    });
  }

  private showToast(title: String, message: String, status: NbComponentStatus) {
    this.toastrService.show(
      message,
      title,
      {status});
  }

}
