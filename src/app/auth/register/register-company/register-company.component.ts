import { Component, Inject, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { getDeepFromObject, NB_AUTH_OPTIONS } from '@nebular/auth';
import { NbComponentStatus, NbToastrService } from '@nebular/theme';
import { Observable, of } from 'rxjs';
import { first } from 'rxjs/operators';
import { Occupation } from '../../../@core/data/occupation';
import { Company } from '../../../@core/data/company';
import { User } from '../../../@core/data/user';
import { OccupationService } from '../../../@core/service/occupation.service';
import { LocationService } from '../../../@core/service/location.service';
import { RegisterService } from '../../../@core/service/register.service';

@Component({
  selector: 'register-company',
  templateUrl: './register-company.component.html',
  styleUrls: ['./register-company.component.scss'],
})
export class RegisterCompanyComponent implements OnInit {

  showPassword: string = 'eye';
  checkIssues: boolean = false;
  occupations$: Observable<Occupation[]>;
  occupations: Occupation[];
  places$: Observable<string[]>;
  places: string[];
  townships: string[];
  townships$: Observable<string[]>;
  tmpEmail: string = '';
  user: User;

  company: Company = {
    address: {location: {placeCode: 0, placeName: '', townshipName: '', townshipCode: 0, zipCode: ''}, street: ''},
    email: '',
    emailReception: '',
    legalRep: {firstName: '', lastName: ''},
    nriz: {username: '', password: ''},
    manager: '',
    mat: '',
    name: '',
    occupation: {code: '', name: ''},
    operations: [],
    storages: [],
    permits: [],
    pib: '',
    telephone: '',
  };

  constructor(@Inject(NB_AUTH_OPTIONS) protected options = {}, private locationService: LocationService,
              private occupationService: OccupationService, private registerService: RegisterService,
              private router: Router, private toastrService: NbToastrService) {
  }

  ngOnInit() {
    this.locationService.getDistinctTownships().pipe(first()).subscribe(o => {
      this.townships = o;
      this.townships$ = of(o);
    });
    this.occupationService.getOccupations().pipe(first()).subscribe(d => {
      this.occupations = d;
      this.occupations$ = of(d);
    });
    this.registerService.getCompany().pipe(first()).subscribe(f => {
      if (f !== undefined) {
        this.company = f;
      }
    });
    this.registerService.getUser().pipe(first()).subscribe(k => {
      if (k !== undefined) {
        this.user = k;
      }
    });
    this.registerService.sendCompany(of(this.company));
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }

  private checkAddress(): boolean {
    return this.townships.includes(this.company.address.location.townshipName)
      && this.places.includes(this.company.address.location.placeName);
  }

  private checkOccupation(): boolean {
    return this.occupations.map(x => x.name).includes(this.company.occupation.name);
  }

  async validateCompany(form: NgForm) {
    if (form.invalid || !this.checkAddress() || !this.checkOccupation()) {
      this.checkIssues = true;
      this.showToast('Greška', 'Ispravite greške da bi ste nastavili.', 'warning');
      return false;
    }
    let text = '';
    const test = await Promise.all(this.registerService.checkCompany(this.company)).then(b => {
      text = !b[0] ? 'taj pib' : text;
      text = !b[1] ? 'taj matični broj' : text;
      text = !b[2] ? 'taj email' : text;
      text = !b[3] ? 'taj email za prijem' : text;
      text = !b[4] ? 'taj telefon' : text;
      text = !b[5] ? 'to korisničko ime za NRIZ' : text;
      return b[0] && b[1] && b[2] && b[3] && b[4] && b[5];
    });
    if (!test) {
      this.checkIssues = true;
      this.showToast('Greška', `Već postoji ${text}!`, 'danger');
      return;
    }
    if (form.valid && this.tmpEmail === '' && this.company.emailReception !== '') {
      this.router.navigate(['auth/register-operations']);
    } else {
      this.checkIssues = true;
      this.showToast('Greška', 'Ispravite greške da bi ste nastavili.', 'warning');
    }
  }

  private showToast(title: String, message: String, status: NbComponentStatus) {
    this.toastrService.show(
      message,
      title,
      {status});
  }

  private getPlaces(townshipName: string): void {
    if (townshipName === undefined) return;
    this.locationService.getPlacesFromTownship(townshipName).pipe(first()).subscribe(m => {
      this.places = m;
      this.places$ = of(m);
    });
  }

  chooseTownship(value: string) {
    if (value === '') {
      this.townships$ = of(this.townships);
      return;
    }
    this.townships$ = this.locationService.filter(value, this.townships);
    if (this.townships$ !== undefined)
      this.townships$.subscribe(x => {
        this.getPlaces(x[0]);
      });
  }

  findPlaces(value: string) {
    this.places$ = this.locationService.filter(value, this.places);
  }

  findOccupations(occupation: string) {
    this.occupations$ = this.occupationService.filter(occupation, this.occupations);
  }

  // Clear the temporary email so the validation works
  clearTmpEmail(): void {
    this.tmpEmail = '';
  }

  setCompanyEmail(): void {
    this.company.emailReception = this.tmpEmail;
  }

}
