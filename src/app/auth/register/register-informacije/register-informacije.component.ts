import { Component, Inject, OnInit } from '@angular/core';
import { getDeepFromObject, NB_AUTH_OPTIONS } from '@nebular/auth';
import { Observable, of } from 'rxjs';
import { first } from 'rxjs/operators';
import { Firma } from '../../../@core/data/firma';
import { Mesto } from '../../../@core/data/mesto';
import { Skladiste } from '../../../@core/data/skladiste';
import { MestoService } from '../../../@core/service/mesto.service';
import { RegisterService } from '../../../@core/service/register.service';

@Component({
  selector: 'ngx-register-informacije',
  templateUrl: './register-informacije.component.html',
  styleUrls: ['./register-informacije.component.scss'],
})
export class RegisterInformacijeComponent implements OnInit {

  constructor(@Inject(NB_AUTH_OPTIONS) protected options = {}, private registerService: RegisterService,
              private mestoService: MestoService) {
  }

  ngOnInit(): void {
    this.registerService.getInformacije(of(this.skladista));
    this.registerService.sendOperacije().subscribe(o => {
      this.operacije = o;
    });
    this.mestoService.getOpstine().pipe(first()).subscribe(o => {
      this.opstine = o;
      this.opstine$ = of(o);
    });
  }

  private getMesta(nazivOpstine): void {
    this.mestoService.getNazivMesta(nazivOpstine[0]._id).subscribe(m => {
      this.mesta = m;
      this.mesta$ = of(this.mesta);
    });
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }

  private filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.opstine.filter(x => x._id.toLowerCase().includes(filterValue));
  }

  onModelChange(value: string) {
    value.toLowerCase();
    this.opstine$ = of(this.filter(value));
    this.getMesta(this.filter(value));
  }

  private filter2(value: string): Mesto[] {
    const filterValue = value.toLowerCase();
    return this.mesta.filter(x => x.mesto.naziv.toLowerCase().includes(filterValue));
  }

  onModelChange2(value: string) {
    value.toLowerCase();
    this.mesta$ = of(this.filter2(value));
  }

  mesta$: Observable<any>;
  mesta: any;
  opstine: any;
  opstine$: Observable<any>;
  firma: Firma;
  operacije: string[];

  informacije: {
    skladista: Skladiste;
  };
  skladista: Skladiste = {
    _id: '',
    maxKolicina: 0,
    naziv: 'Skladište #1',
    adresa: {
      mesto: {
        _id: '',
        opstina: {
          naziv: '',
          sifra: 0,
        },
        mesto: {
          naziv: '',
          sifra: 0,
        },
        postanskiBroj: '',
      },
      ulica: '',
    },
    kolicina: 0,
  };

}
