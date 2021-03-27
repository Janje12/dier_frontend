import { Component, Inject, OnInit } from '@angular/core';
import { NB_AUTH_OPTIONS } from '@nebular/auth';
import { NbButton, NbToastrService } from '@nebular/theme';
import { first } from 'rxjs/operators';
import { Company } from '../../../@core/data/company';
import { CompanyOperations } from '../../../@core/data/companyOperations';
import { CompanyService } from '../../../@core/service/company.service';
import { RoleService } from '../../../@core/service/role.service';

@Component({
  selector: 'profile-operations',
  templateUrl: './profile-operations.component.html',
  styleUrls: ['./profile-operations.component.css'],
})
export class ProfileOperationsComponent implements OnInit {

  company: Company = {
    address: {location: undefined, street: ''},
    email: '',
    emailReception: '',
    legalRep: {firstName: '', lastName: ''},
    manager: '',
    mat: '',
    name: '',
    nriz: {password: '', username: ''},
    occupation: undefined,
    operations: [],
    pib: '',
    telephone: '',
  };
  operations: CompanyOperations;
  showAddOperations: boolean = false;

  constructor(private companyService: CompanyService, @Inject(NB_AUTH_OPTIONS) protected options = {},
              private toastrService: NbToastrService, private roleService: RoleService) {
  }

  ngOnInit(): void {
    this.companyService.getCompany(this.roleService.getCompanyID()).pipe(first()).subscribe(f => {
      this.company = f;
    });
    this.roleService.getOperations(undefined, undefined, true).subscribe(o => {
      this.operations = o;
      console.log(o);
    });
  }

  disableButton(button: NbButton) {
    button.disabled = true;
    this.showAddOperations = true;
  }

  addSpecialWasteOperation(operation: string) {
    this.company.operations.push(operation);
    this.companyService.updateCompany(this.company, this.company._id).subscribe(x => {
    });
    this.roleService.getOperations(this.company.operations, undefined, true).subscribe(o => {
      this.operations = o;
    });
    this.roleService.loginUser();
    if (this.operations.specialWasteOperations.production &&
      this.operations.specialWasteOperations.export && this.operations.specialWasteOperations.import)
      this.showAddOperations = false;
  }

}
