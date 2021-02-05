import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { getDeepFromObject, NB_AUTH_OPTIONS } from '@nebular/auth';
import { NbComponentStatus, NbToastrService } from '@nebular/theme';
import { Company } from '../../../@core/data/company';
import { CompanyService } from '../../../@core/service/company.service';

@Component({
  selector: 'ngx-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss'],
})
export class CompanyComponent implements OnInit {

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

  constructor(private route: ActivatedRoute, private firmaService: CompanyService,
              @Inject(NB_AUTH_OPTIONS) protected options = {},
              private toastrService: NbToastrService, private router: Router) {
  }

  ngOnInit(): void {
    const pib = this.route.snapshot.paramMap.get('pib');
    this.firmaService.getCompany(pib, 'pib').subscribe(c => {
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
      this.firmaService.updateCompany(this.company, this.company._id).subscribe(u => {
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
    this.router.navigate(['admin/korisnici', this.company.manager]);
  }

}
