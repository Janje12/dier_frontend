import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { getDeepFromObject, NB_AUTH_OPTIONS } from '@nebular/auth';
import { NbComponentStatus, NbToastrService, NbWindowRef, NbWindowService } from '@nebular/theme';
import { first } from 'rxjs/operators';
import { Permit } from '../../../@core/data/permit';
import { Catalog } from '../../../@core/data/catalog';
import { PermitService } from '../../../@core/service/permit.service';
import { RoleService } from '../../../@core/service/role.service';

@Component({
  selector: 'profile-permit',
  templateUrl: './profile-permits.component.html',
  styleUrls: ['./profile-permits.component.scss'],
})
export class ProfilePermitsComponent implements OnInit {
  @ViewChild('viewTrash', {read: TemplateRef}) viewTrash: TemplateRef<HTMLElement>;

  private windowRef: NbWindowRef;
  permits: Permit[] = [];
  selectedPermit: Permit;
  inputsDisabled: boolean = true;

  constructor(private permitService: PermitService, private roleService: RoleService,
              @Inject(NB_AUTH_OPTIONS) protected options = {},
              private toastrService: NbToastrService,
              private datePipe: DatePipe, private windowService: NbWindowService) {
  }

  ngOnInit(): void {
    this.permitService.getCompaniesPermits(this.roleService.getCompanyID()).pipe(first()).subscribe(d => {
      this.permits = d;
    });
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }

  enableInputs(): void {
    this.inputsDisabled = false;
  }

  updatePermits(form: NgForm): void {
    if (!form.valid)
      this.showToast('Greška', 'Informacije koje ste uneli nisu tačne!', 'danger');
    else {
      this.permits.forEach(d => this.permitService.updatePermit(d, d._id).subscribe(x => {
      }));
      this.showToast('Uspeh', 'Uspešno ste izmenili informacije!', 'success');
      this.inputsDisabled = true;
    }
  }

  openPermitsTrashWindow(permit: Permit): void {
    this.selectedPermit = permit;
    this.windowRef = this.windowService.open(this.viewTrash, {title: 'Lista otpada'});
  }

  updatePermitsTrashMethod(trashList: Catalog[]): void {
    this.selectedPermit.trashList = trashList;
    this.permitService.updatePermit(this.selectedPermit, this.selectedPermit._id).subscribe(x => {
    });
    this.showToast('Uspeh', 'Uspešno ste izmenili informacije!', 'success');
    this.windowRef.close();
  }

  getDate(date: Date): string {
    return this.datePipe.transform(date, 'dd-MM-yyyy');
  }

  private showToast(title: String, message: String, status: NbComponentStatus) {
    this.toastrService.show(
      message,
      title,
      {status});
  }

}
