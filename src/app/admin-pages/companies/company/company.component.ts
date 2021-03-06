import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { getDeepFromObject, NB_AUTH_OPTIONS } from '@nebular/auth';
import { NbComponentStatus, NbToastrService } from '@nebular/theme';
import { Company } from '../../../@core/data/company';
import { AdminService } from '../../../@core/service/admin.service';
import { CompanyService } from '../../../@core/service/company.service';

@Component({
  selector: 'admin-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss'],
})
export class CompanyComponent implements OnInit {

  showPassword: string = 'eye';
  company: Company = {
    address: {location: {placeName: '', placeCode: 0, townshipName: '', zipCode: '', townshipCode: 0}, street: ''},
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

  constructor(private route: ActivatedRoute, private companyService: CompanyService,
              @Inject(NB_AUTH_OPTIONS) protected options = {}, private adminService: AdminService,
              private toastrService: NbToastrService, private router: Router) {
  }

  ngOnInit(): void {
    const pib = this.route.snapshot.paramMap.get('pib');
    this.adminService.getCompany(pib, 'pib').subscribe(c => {
      this.company = c;
    });
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }

  updateCompany(form: NgForm): void {
    if (!form.valid)
      this.showToast('Greška', 'Informacije koje ste uneli nisu tačne!', 'danger');
    else {
      this.companyService.updateCompany(this.company, this.company._id).subscribe(u => {
      });
      this.showToast('Uspeh', 'Uspešno ste izmenili informacije!', 'success');
    }
  }

  private showToast(title: String, message: String, status: NbComponentStatus) {
    this.toastrService.show(
      message,
      title,
      {status});
  }

  gotoUser(): void {
    this.router.navigate(['admin/users', this.company.manager]);
  }

}
