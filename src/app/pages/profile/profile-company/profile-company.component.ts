import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { getDeepFromObject, NB_AUTH_OPTIONS, NbAuthService } from '@nebular/auth';
import { NbComponentStatus, NbToastrService } from '@nebular/theme';
import { first } from 'rxjs/operators';
import { Company } from '../../../@core/data/company';
import { CompanyService } from '../../../@core/service/company.service';
import { RoleService } from '../../../@core/service/role.service';
import { ToastrService } from '../../../@core/service/toastr.service';

@Component({
  selector: 'profile-company',
  templateUrl: './profile-company.component.html',
  styleUrls: ['./profile-company.component.scss'],
})
export class ProfileCompanyComponent implements OnInit {

  company: Company = {
    address: {location: {placeName: '', placeCode: 0, zipCode: '', townshipCode: 0, townshipName: ''}, street: ''},
    email: '',
    emailReception: '',
    legalRep: {firstName: '', lastName: ''},
    nriz: {username: '', password: ''},
    manager: '',
    mat: '',
    name: '',
    occupation: {name: '', code: ''},
    operations: [],
    pib: '',
    telephone: '',
    fax: '',
  };
  inputsDisabled: boolean = true;

  constructor(private companyService: CompanyService, @Inject(NB_AUTH_OPTIONS) protected options = {},
              private toastrService: ToastrService, private roleService: RoleService, private authService: NbAuthService) {
  }

  ngOnInit(): void {
    this.companyService.getCompany(this.roleService.getCompanyID()).pipe(first()).subscribe(f => {
      this.company = f;
    });
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }

  enableInputs(): void {
    this.inputsDisabled = false;
  }

  updateFirma(form: NgForm): void {
    if (!form.valid)
      this.toastrService.showToast('Greška', 'Informacije koje ste uneli nisu tačne!', 'danger');
    else {
      this.companyService.updateCompany(this.company, this.company._id).subscribe(f => {
      });
      this.toastrService.showToast('Uspeh', 'Uspešno ste izmenili informacije!', 'success');
      this.inputsDisabled = true;
      // When korisnik data is changed it has to generate a new token!
      let token = null;
      this.authService.getToken().subscribe(t => {
        token = t;
      });
      this.authService.refreshToken('email', token).subscribe(x => {
      });
    }
  }

}
