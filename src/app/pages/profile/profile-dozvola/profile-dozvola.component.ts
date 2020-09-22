import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { getDeepFromObject, NB_AUTH_OPTIONS } from '@nebular/auth';
import { NbComponentStatus, NbToastrService, NbWindowRef, NbWindowService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { first } from 'rxjs/operators';
import { Dozvola } from '../../../../@core/data/dozvola';
import { Katalog } from '../../../../@core/data/katalog';
import { DozvolaService } from '../../../../@core/service/dozvola.service';
import { KatalogService } from '../../../../@core/service/katalog.service';
import { CATALOG_SETTINGS } from '../../../../pages/trashCatalog.settings';

@Component({
  selector: 'ngx-profile-dozvola',
  templateUrl: './profile-dozvola.component.html',
  styleUrls: ['./profile-dozvola.component.scss'],
})
export class ProfileDozvolaComponent implements OnInit {
  @ViewChild('viewTrash', {read: TemplateRef}) viewTrash: TemplateRef<HTMLElement>;

  dozvole: Dozvola[] = [];
  currDozvola: Dozvola;
  inputsDisabled: boolean = true;
  listaOtpada: Katalog[] = [];
  katalog: LocalDataSource = new LocalDataSource();
  katalogSettings: any = CATALOG_SETTINGS;

  constructor(private dozvolaService: DozvolaService,
              @Inject(NB_AUTH_OPTIONS) protected options = {},
              private toastrService: NbToastrService,
              private datePipe: DatePipe, private katalogService: KatalogService,
              private windowService: NbWindowService) {
  }

  ngOnInit(): void {
    this.dozvolaService.getDozvolaFrime().pipe(first()).subscribe(d => {
      this.dozvole = d;
    });
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }

  enableInputs(): void {
    this.inputsDisabled = false;
  }

  updateDozvole(form: NgForm): void {
    if (!form.valid)
      this.showToast('Greška', 'Informacije koje ste uneli nisu tačne!', 'danger');
    else {
      this.dozvole.forEach(d => this.dozvolaService.updateDozvola(d).subscribe(x => {
      }));
      this.showToast('Uspeh', 'Uspešno ste izmenili informacije!', 'success');
      this.inputsDisabled = true;
      // When korisnik data is changed it has to generate a new token!
    }
  }

  updateListaOtpada(): void {
    this.dozvolaService.updateDozvola(this.currDozvola).subscribe(x => {
    });
    this.showToast('Uspeh', 'Uspešno ste izmenili informacije!', 'success');
    this.openWindow.close();
  }

  private showToast(title: String, message: String, status: NbComponentStatus) {
    this.toastrService.show(
      message,
      title,
      {status});
  }

  getDate(date: Date): string {
    return this.datePipe.transform(date, 'dd-MM-yyyy');
  }

  firstLoad = true;
  private openWindow: NbWindowRef;
  showOtpade(dozvola: Dozvola): void {
    if (this.firstLoad) {
      this.firstLoad = false;
      this.katalogService.getKatalog().subscribe(k => {
        this.katalog.load(k);
      });
    }
    this.currDozvola = dozvola;
    this.listaOtpada = dozvola.listaOtpada;
    this.openWindow = this.windowService.open(this.viewTrash, {title: 'Lista otpada'});
  }

  onSearch(query: string = '') {
    this.katalog.setFilter([
      {
        field: 'indeksniBroj',
        search: query,
        filter: function filterFunction(cell: any, search: string): boolean {
          cell = cell.replace(/\s+/g, '').includes(search.replace(/\s+/g, ''));
          return cell;
        },
      },
    ], true);
  }

  chooseOtpad(data: any, button: any) {
    if (!button.disabled)
      return;
    let otpad = data;
    if (data.data !== undefined)
      otpad = data.data;
    if (this.listaOtpada.some(x => x._id === otpad._id)) {
      this.removeOtpad(otpad);
    } else {
      this.listaOtpada.push(otpad);
    }
  }

  removeOtpad(otpad: any) {
    const found = this.listaOtpada.filter(x => x._id === otpad._id)[0];
    if (found) {
      const index = this.listaOtpada.indexOf(found, 0);
      if (index > -1)
        this.listaOtpada.splice(index, 1);
    }
  }

}
