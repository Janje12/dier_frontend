import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbComponentStatus, NbToastrService } from '@nebular/theme';
import { first } from 'rxjs/operators';
import { Company } from '../../../@core/data/company';
import { Storage } from '../../../@core/data/storage';
import { CompanyService } from '../../../@core/service/company.service';
import { RoleService } from '../../../@core/service/role.service';
import { StorageService } from '../../../@core/service/storage.service';

@Component({
  selector: 'ngx-company-reports',
  templateUrl: './company-reports.component.html',
  styleUrls: ['./company-reports.component.scss'],
})
export class CompanyReportsComponent implements OnInit {

  company: Company = {
    address: {location: undefined, street: ''},
    email: '',
    emailReception: '',
    legalRep: '',
    manager: '',
    mat: '',
    name: '',
    occupation: undefined,
    operations: [],
    pib: '',
    telephone: '',
  };
  skladista: Storage[];
  operations: any;

  constructor(private route: ActivatedRoute, private firmaService: CompanyService,
              private toastrService: NbToastrService, private skladisteService: StorageService,
              private roleService: RoleService) {
  }

  ngOnInit(): void {
    const pib = this.route.snapshot.paramMap.get('pib');
    this.firmaService.getCompany(pib, 'pib').subscribe(c => {
      this.company = c;
      this.skladisteService.getCompaniesStorage('', this.company._id).pipe(first()).subscribe(s => {
        this.skladista = s;
      });
      this.roleService.getOperations().subscribe(o => {
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
