import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbComponentStatus, NbToastrService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { FirmaService } from '../../@core/service/firma.service';
import { COMPANY_SETTINGS } from './companyTable.settings';

@Component({
  selector: 'ngx-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css'],
})
export class CompaniesComponent implements OnInit {

  companySource: LocalDataSource = new LocalDataSource();
  companySettings: any = COMPANY_SETTINGS;

  constructor(private firmaService: FirmaService, private toastrService: NbToastrService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.firmaService.getFirma().subscribe(f => {
      this.companySource.load(f);
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
      this.firmaService.createFirma(company).subscribe(c => {
      });
      confirm.resolve();
      this.showToast('Uspeh!', 'Uspešno ste kreirali ' + company.naziv, 'success');
    } catch (err) {
      confirm.reject();
      this.showToast('Greška!', 'Došlo je do greške do kreiranja ' + company.naziv +
        '. Molimo vas pokušajte kasnije.', 'danger');
    }
  }

  updateCompany({newData: company, confirm: confirm}): void {
    try {
      this.firmaService.updateFirma(company).subscribe(c => {
      });
      confirm.resolve();
      this.showToast('Uspeh!', 'Uspešno ste uredili ' + company.naziv, 'success');
    } catch (err) {
      confirm.reject();
      this.showToast('Greška!', 'Došlo je do greške dok ste pokušali da promenite ' + company.naziv +
        '. Molimo vas pokušajte kasnije.', 'danger');
    }
  }

  deleteCompany({data: company, confirm: confirm}): void {
    try {
      this.firmaService.deleteFirma(company).subscribe(c => {
      });
      confirm.resolve();
      this.showToast('Uspeh!', 'Uspešno ste obrisali ' + company.naziv, 'success');
    } catch (err) {
      confirm.reject();
      this.showToast('Greška!', 'Došlo je do greške dok ste pokušali da obrišete ' + company.naziv +
        '. Molimo vas pokušajte kasnije.', 'danger');
    }
  }


  companyInfo({data: company}): void {
    this.router.navigate(['admin/firme', company.pib]);
  }
}
