import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbComponentStatus, NbToastrService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { AdminService } from '../../@core/service/admin.service';
import { CompanyService } from '../../@core/service/company.service';
import { COMPANY_SETTINGS } from './companyTable.settings';

@Component({
  selector: 'admin-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss'],
})
export class CompaniesComponent implements OnInit {

  companies: LocalDataSource = new LocalDataSource();
  companySettings: any = COMPANY_SETTINGS;

  constructor(private companyService: CompanyService, private toastrService: NbToastrService,
              private router: Router, private adminService: AdminService) {
  }

  ngOnInit(): void {
    this.adminService.getCompanies().subscribe(f => {
      this.companies.load(f);
    });
  }

  private showToast(title: String, message: String, status: NbComponentStatus) {
    this.toastrService.show(
      message,
      title,
      {status});
  }

  // TOASTR SERVICE THAT WORKS OFF OF the API!
  createCompany({newData: company, confirm: confirm}): void {
    try {
      this.companyService.createCompany(company).subscribe(c => {
      });
      confirm.resolve();
      this.showToast('Uspeh!', 'Uspešno ste kreirali ' + company.name, 'success');
    } catch (err) {
      confirm.reject();
      this.showToast('Greška!', 'Došlo je do greške do kreiranja ' + company.name +
        '. Molimo vas pokušajte kasnije.', 'danger');
    }
  }

  updateCompany({newData: company, confirm: confirm}): void {
    try {
      this.companyService.updateCompany(company, company._id).subscribe(c => {
      });
      confirm.resolve();
      this.showToast('Uspeh!', 'Uspešno ste uredili ' + company.name, 'success');
    } catch (err) {
      confirm.reject();
      this.showToast('Greška!', 'Došlo je do greške dok ste pokušali da promenite ' + company.name +
        '. Molimo vas pokušajte kasnije.', 'danger');
    }
  }

  deleteCompany({data: company, confirm: confirm}): void {
    try {
      if (!window.confirm('Da li ste sigurni da želite da obrišete ' + company.name + '?'))
        return;
      this.companyService.deleteCompany(company._id).subscribe(c => {
      });
      confirm.resolve();
      this.showToast('Uspeh!', 'Uspešno ste obrisali ' + company.name, 'success');
    } catch (err) {
      confirm.reject();
      this.showToast('Greška!', 'Došlo je do greške dok ste pokušali da obrišete ' + company.name +
        '. Molimo vas pokušajte kasnije.', 'danger');
    }
  }

  companyInfo({data: company}): void {
    this.router.navigate(['admin/companies', company.pib]);
  }
}
