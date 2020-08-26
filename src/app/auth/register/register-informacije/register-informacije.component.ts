import { Component, Inject, OnInit } from '@angular/core';
import { getDeepFromObject, NB_AUTH_OPTIONS } from '@nebular/auth';
import { RegisterService } from '../../../@core/service/register.service';

@Component({
  selector: 'ngx-register-informacije',
  templateUrl: './register-informacije.component.html',
  styleUrls: ['./register-informacije.component.scss'],
})
export class RegisterInformacijeComponent implements OnInit {

  constructor(@Inject(NB_AUTH_OPTIONS) protected options = {}, private registerService: RegisterService) {
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }

  ngOnInit(): void {
    this.registerService.getOperacije().subscribe(o => {
      this.operacije = o;
    });
    this.findOperations();
  }

  findOperations(): void {
    this.operacije.forEach(x => {
      if (x.startsWith('Proizvodnja'))
        this.proizvodnja = true;
      if (x.startsWith('Transport'))
        this.transport = true;
      if (x.startsWith('Tretman'))
        this.tretman = true;
    });
  }

  operacije: string[];
  proizvodnja: boolean = false;
  transport: boolean = false;
  tretman: boolean = false;

}
