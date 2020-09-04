import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { getDeepFromObject, NB_AUTH_OPTIONS } from '@nebular/auth';
import { NbComponentStatus, NbToastrService } from '@nebular/theme';
import { Skladiste } from '../../../@core/data/skladiste';
import { SkladisteDeponija } from '../../../@core/data/skladisteDeponija';
import { SkladisteService } from '../../../@core/service/skladiste.service';

@Component({
  selector: 'ngx-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.scss'],
})
export class StorageComponent implements OnInit {

  storage: SkladisteDeponija = {
    geolokacijaE: undefined, geolokacijaN: undefined, vrstaDeponije: undefined,
    _id: '', adresa: {
      mesto: {
        mestoNaziv: '',
        mestoSifra: 0, opstinaNaziv: '', opstinaSifra: 0, postanskiBroj: '',
      },
      ulica: '',
    }, kolicina: 0, maxKolicina: 0, naziv: '',
  };

  constructor(private route: ActivatedRoute, private skladisteService: SkladisteService,
              @Inject(NB_AUTH_OPTIONS) protected options = {},
              private toastrService: NbToastrService, private router: Router) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.skladisteService.getOneSkladiste(id).subscribe(s => {
      this.storage = s;
    });
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }

  updateStorage(form: NgForm): void {
    if (!form.valid)
      this.showToast('Greška', 'Informacije koje ste uneli nisu tačne!', 'danger');
    else {
      this.skladisteService.updateSkladiste(this.storage).subscribe(u => {
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

  calculateStatus(): NbComponentStatus {
    if ((this.storage.kolicina / this.storage.maxKolicina) * 100 < 33)
      return 'success';
    else if ((this.storage.kolicina / this.storage.maxKolicina) * 100 < 66)
      return 'warning';
    else
      return 'danger';
  }

  calculateValue(): number {
    return (this.storage.kolicina / this.storage.maxKolicina) * 100;
  }

  gotoUser(): void {
    this.router.navigate(['admin/firme', this.storage]);
  }

}
