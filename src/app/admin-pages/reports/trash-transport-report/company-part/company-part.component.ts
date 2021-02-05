import { Component, Input, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { first } from 'rxjs/operators';
import { DKO } from '../../../../@core/data/dko';
import { Company } from '../../../../@core/data/company';
import { CompanyClient } from '../../../../@core/data/companyClient';
import { DkoService } from '../../../../@core/service/dko.service';
import { CompanyService } from '../../../../@core/service/company.service';

@Component({
  selector: 'company-part',
  templateUrl: './company-part.component.html',
  styleUrls: ['./company-part.component.css'],
})
export class CompanyPartComponent implements OnInit {
  @Input() company: Company;
  @Input() type: String;
  @Input() trashType: String;
  tmpCompany: CompanyClient = {
    address: {location: undefined, street: ''}, email: '', mat: '', name: '', operations: [], pib: '', telephone: '',

  };
  dko: DKO;
  companies: Company[] = [];
  firstLoad: boolean = false;
  dLista: string[] = [];
  rLista: string[] = [];
  treatmentList: string[] = [];

  constructor(private dkoService: DkoService, private firmaService: CompanyService) {
    for (let i = 1; i <= 15; i++) {
      this.dLista.push('D' + i);
    }
    for (let i = 1; i <= 13; i++) {
      this.rLista.push('R' + i);
    }
  }

  ngOnInit(): void {
    this.dkoService.getDKO().subscribe(d => {
      this.dko = d;
      if (this.company) {
        this.tmpCompany = this.company;
        this.dko.firmaProizvodjac = this.tmpCompany;
      }
    });
  }

  selectList(value: String): void {
    this.treatmentList = value === 'R' ? this.rLista : this.dLista;
  }

  sendCompany() {
    if (this.type === 'transport') {
      this.tmpCompany.operations.push('Transport ' + this.trashType + ' Otpada');
      this.dko.firmaTransport = this.tmpCompany;
    } else if (this.type === 'recipient') {
      let tmp = this.dko.vrstaPrimalaca.startsWith('s') ? 'Skladištenje' : this.dko.vrstaPrimalaca;
      tmp = tmp[0].toUpperCase() + tmp.substr(1).toLowerCase();
      this.tmpCompany.operations.push(tmp + ' ' + this.trashType + ' Otpada');
      this.dko.firmaPrimalac = this.tmpCompany;
    }
    this.dkoService.sendDKO(of(this.dko));
  }

  chooseCompany() {
    if (this.type === 'transport' && !this.firstLoad) {
      /* this.firmaService.findFirmas('Transport ' + this.trashType + ' Otpada', 'radFirme').pipe(first()).
      subscribe(c => {
        this.companies = c;
        this.firstLoad = true;
      });*/
    } else if (this.type === 'recipient' && !this.firstLoad) {
      this.firstLoad = true;
      /*this.firmaService.findFirmas('Tretman ' + this.trashType + ' Otpada', 'radFirme').pipe(first()).subscribe(c => {
        this.companies = this.companies.concat(c);
      });
      this.firmaService.findFirmas('Odlaganje ' + this.trashType + ' Otpada', 'radFirme').pipe(first()).subscribe(c => {
        this.companies = this.companies.concat(c);
      });
      this.firmaService.findFirmas('Skladištenje ' + this.trashType + ' Otpada', 'radFirme')
        .pipe(first()).subscribe(c => {
        this.companies = this.companies.concat(c);
      });*/
    }
  }

  checkCompanyType(type: string): boolean {
    if (this.tmpCompany.operations.includes(type))
      return true;
    return false;
  }

}
