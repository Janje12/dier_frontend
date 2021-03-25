import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { getDeepFromObject, NB_AUTH_OPTIONS } from '@nebular/auth';
import { NbIconConfig, NbToggleComponent } from '@nebular/theme';
import { of } from 'rxjs';
import { first } from 'rxjs/operators';
import { Company } from '../../../@core/data/company';
import { RegisterService } from '../../../@core/service/register.service';
import { ToastrService } from '../../../@core/service/toastr.service';

@Component({
  selector: 'register-operations',
  templateUrl: './register-operations.component.html',
  styleUrls: ['./register-operations.component.scss'],
})
export class RegisterOperationsComponent implements OnInit {
  @ViewChild('wasteManagerForm') form: NgForm;

  trashIco: NbIconConfig = {icon: 'trash', pack: 'solid'};
  carBatteryIco: NbIconConfig = {icon: 'car-battery', pack: 'solid'};
  recyleIco: NbIconConfig = {icon: 'recycle', pack: 'solid'};
  waterIco: NbIconConfig = {icon: 'water', pack: 'solid'};
  airIco: NbIconConfig = {icon: 'wind', pack: 'solid'};

  trashOperationsNo: number = 0;
  specialWasteNo: number = 0;
  packageOperationsNo: number = 0;
  waterOperationsNo: number = 0;
  airOperationsNo: number = 0;
  operations: string[] = [];
  company: Company;
  checkIssues: boolean = false;

  constructor(@Inject(NB_AUTH_OPTIONS) protected options = {}, private router: Router,
              private registerService: RegisterService, private toastrService: ToastrService) {
  }

  ngOnInit(): void {
    this.registerService.getOperations().pipe(first()).subscribe(o => {
      if (o !== undefined) {
        this.operations = o;
        this.updateOperations();
      }
    });
    this.registerService.getCompany().pipe(first()).subscribe(c => {
      this.company = c;
    });
    this.registerService.getUser().pipe(first()).subscribe(u => {
      this.company.wasteManager.firstName = u.firstName;
      this.company.wasteManager.lastName = u.lastName;
    });
    this.registerService.sendCompany(of(this.company));
    this.registerService.sendOperations(of(this.operations));
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }

  validateOperations(): void {
    if (this.form.invalid) {
      this.checkIssues = true;
      this.toastrService.showToast('Greška', 'Ispravite greške da bi ste nastavili.', 'warning');
      return;
    }
    if (this.trashOperationNumber(true) + this.specialWasteOperationNumber(true) === 0) {
      this.company.wasteManager.firstName = '';
      this.company.wasteManager.lastName = '';
    }
    if (this.operations.length > 0) {
      this.clearRemovedOperationsData();
      this.router.navigate(['auth/register-informations']);
    } else {
      this.toastrService.showToast('Greška', 'Odaberite bar jednu operaciju da biste nastavili.', 'warning');
    }
  }

  private clearRemovedOperationsData() {
    this.company.vehicles = [];
    this.company.storages = [];
    this.company.permits = [];
    this.company.specialWastes = [];
    this.registerService.sendCompany(of(this.company));
    this.registerService.sendOperations(of(this.operations));
  }

  trashOperationNumber(number: boolean = false): any {
    return number ? this.operations.filter(x =>
      x.toLowerCase().includes('neopasnog') || x.toLowerCase().includes('opasnog')).length :
      this.operations.filter(x => x.toLowerCase().includes('neopasnog') || x.toLowerCase().includes('opasnog')).length + '';
  }

  specialWasteOperationNumber(number: boolean = false): any {
    return number ? this.operations.filter(x => x.toLowerCase().includes('tokova')).length :
      this.operations.filter(x => x.toLowerCase().includes('tokova')).length + '';
  }

  updateOperations() {
    // NEEDS FIXING
    this.trashOperationsNo = this.operations.filter(x =>
      x.toLowerCase().includes('neopasnog') || x.toLowerCase().includes('opasnog')).length;
    this.specialWasteNo = this.operations.filter(x => x.toLowerCase().includes('tokova')).length;
  }

  addProcessOperation(op: string, e: boolean, productionToggle: NbToggleComponent) {
    this.addOperation(op, e);
    if (!productionToggle.checked) {
      productionToggle.checked = true;
    }
    if (!productionToggle.disabled) {
      productionToggle.setDisabledState(true);
    }
    if (op.includes('Neopasnog'))
      this.addOperation('Proizvodnja Neopasnog Otpada', e, false);
    else
      this.addOperation('Proizvodnja Opasnog Otpada', e, false);
  }

  addOperation(op: string, e: boolean, remove: boolean = true) {
    if (e) {
      if (!this.operations.includes(op))
        this.operations.push(op);
    } else if (remove) {
      this.operations.splice(this.operations.findIndex(x => x === op), 1);
    }
  }

}
