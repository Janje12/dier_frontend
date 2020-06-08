import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { getDeepFromObject, NB_AUTH_OPTIONS } from '@nebular/auth';
import { Observable } from 'rxjs';
import { Firma } from '../../../@core/data/firma';
import { Korisnik } from '../../../@core/data/korisnik';
import { RegisterService } from '../../../@core/service/register.service';

@Component({
  selector: 'ngx-register-potvrda',
  templateUrl: './register-potvrda.component.html',
  styleUrls: ['./register-potvrda.component.scss'],
})
export class RegisterPotvrdaComponent implements OnInit {
  @Output() registrujSe = new EventEmitter<any>();

  pozoviRegistarciju(): void {
    this.registrujSe.next();
  }

  constructor(@Inject(NB_AUTH_OPTIONS) protected options = {}, private registerService: RegisterService) {
  }

  ngOnInit(): void {
    this.informacije$ = this.registerService.sendInformacije();
    this.firma$ = this.registerService.sendFirma();
    this.korisnik$ = this.registerService.sendKorisnik();
    this.operacije$ = this.registerService.sendOperacije();
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }

  informacije$: Observable<any>;
  korisnik$: Observable<Korisnik>;
  firma$: Observable<Firma>;
  operacije$: Observable<string[]>;

}
