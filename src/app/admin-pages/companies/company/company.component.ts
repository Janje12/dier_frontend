import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { getDeepFromObject, NB_AUTH_OPTIONS } from '@nebular/auth';
import { NbComponentStatus, NbToastrService } from '@nebular/theme';
import { Firma } from '../../../@core/data/firma';
import { FirmaService } from '../../../@core/service/firma.service';

@Component({
  selector: 'ngx-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss'],
})
export class CompanyComponent implements OnInit {

  company: Firma = {
    _id: '',
    adresa: {mesto: undefined, ulica: ''},
    delatnost: undefined,
    email: '',
    emailPrijem: '',
    mat: '',
    menadzer: '',
    naziv: '',
    pib: '',
    radFirme: [],
    telefon: '',
    zakonskiZastupnik: '',
  };

  constructor(private route: ActivatedRoute, private firmaService: FirmaService,
              @Inject(NB_AUTH_OPTIONS) protected options = {},
              private toastrService: NbToastrService, private router: Router) { }

  ngOnInit(): void {
    const pib = this.route.snapshot.paramMap.get('pib');
    this.firmaService.findFirma(pib, 'pib').subscribe(c => {
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
      this.firmaService.updateFirma(this.company).subscribe(u => {
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
    this.router.navigate(['admin/korisnici', this.company.menadzer]);
  }

}
