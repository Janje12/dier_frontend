import { Component, OnInit } from '@angular/core';
import { NbIconConfig } from '@nebular/theme';
import { of } from 'rxjs';
import { RegisterService } from '../../../@core/service/register.service';

@Component({
  selector: 'ngx-register-operacije',
  templateUrl: './register-operacije.component.html',
  styleUrls: ['./register-operacije.component.scss'],
})
export class RegisterOperacijeComponent implements OnInit {

  constructor(private registerService: RegisterService) {
  }

  ngOnInit(): void {
    this.registerService.getOperacije().subscribe(o => {
      if (o !== undefined) {
        this.operacije = o;
        this.updateOperacije();
      }
    });
    this.registerService.sendOperacije(of(this.operacije));
  }

  brOT: number = 0;
  brPTO: number = 0;
  brATO: number = 0;
  brVODA: number = 0;
  brVAZDUH: number = 0;

  operacije: string[] = [];

  brojOtpad(): string {
    return this.brOT.toString();
  }

  updateOperacije() {
    // NEEDS FIXING
    this.brOT = this.operacije.length;
  }

  addOperacija(op: string, e: boolean) {
    if (e) {
      if (op.includes('Neopasnog') || op.includes('Opasnog'))
        this.brOT++;
      this.operacije.push(op);
    } else {
      if (op.includes('Neopasnog') || op.includes('Opasnog'))
        this.brOT--;
      this.operacije.splice(this.operacije.findIndex(x => x === op), 1);
    }
  }


  trashIco: NbIconConfig = {icon: 'trash', pack: 'solid'};
  carBatteryIco: NbIconConfig = {icon: 'car-battery', pack: 'solid'};
  recyleIco: NbIconConfig = {icon: 'recycle', pack: 'solid'};
  waterIco: NbIconConfig = {icon: 'water', pack: 'solid'};
  airIco: NbIconConfig = {icon: 'wind', pack: 'solid'};

}
