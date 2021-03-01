import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbComponentStatus, NbIconConfig, NbToastrService, NbToggleComponent } from '@nebular/theme';
import { of } from 'rxjs';
import { first } from 'rxjs/operators';
import { RegisterService } from '../../../@core/service/register.service';

@Component({
  selector: 'register-operations',
  templateUrl: './register-operations.component.html',
  styleUrls: ['./register-operations.component.scss'],
})
export class RegisterOperationsComponent implements OnInit {

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

  constructor(private registerService: RegisterService, private toastrService: NbToastrService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.registerService.getOperations().pipe(first()).subscribe(o => {
      if (o !== undefined) {
        this.operations = o;
        this.updateOperations();
      }
    });
    this.registerService.sendOperations(of(this.operations));
  }

  validateOperations(): void {
    if (this.operations.length > 0) {
      this.router.navigate(['auth/register-informations']);
    } else {
      this.showToast('Greška', 'Odaberite bar jednu operaciju da biste nastavili.', 'warning');
    }
  }

  private showToast(title: String, message: String, status: NbComponentStatus) {
    this.toastrService.show(
      message,
      title,
      {status});
  }

  trashOperationNumber(): string {
    return this.operations.filter(x =>
      x.toLowerCase().includes('neopasnog') || x.toLowerCase().includes('opasnog')).length + '';
  }

  specialWasteOpertionNumber(): string {
    return this.operations.filter(x => x.toLowerCase().includes('tokova')).length + '';
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
