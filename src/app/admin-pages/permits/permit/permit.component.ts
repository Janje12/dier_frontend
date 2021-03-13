import { Component, Inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { getDeepFromObject, NB_AUTH_OPTIONS } from '@nebular/auth';
import { NbComponentStatus, NbToastrService, NbWindowRef, NbWindowService } from '@nebular/theme';
import { Catalog } from '../../../@core/data/catalog';
import { Company } from '../../../@core/data/company';
import { Permit } from '../../../@core/data/permit';
import { AdminService } from '../../../@core/service/admin.service';
import { PermitService } from '../../../@core/service/permit.service';

@Component({
  selector: 'admin-permit',
  templateUrl: './permit.component.html',
  styleUrls: ['./permit.component.css'],
})
export class PermitComponent implements OnInit {
  @ViewChild('viewTrash', {read: TemplateRef}) viewTrash: TemplateRef<HTMLElement>;
  private windowRef: NbWindowRef;

  permit: Permit = {code: '', dateCreation: undefined, dateExpiration: undefined, name: '', trashList: [], type: ''};
  company: Company = {
    address: {location: undefined, street: ''},
    email: '',
    emailReception: '',
    legalRep: { firstName: '', lastName: ''},
    nriz: { username: '', password: ''},
    manager: '',
    mat: '',
    name: '',
    occupation: undefined,
    operations: [],
    pib: '',
    telephone: '',
  };

  constructor(private route: ActivatedRoute, private permitService: PermitService,
              @Inject(NB_AUTH_OPTIONS) protected options = {},
              private toastrService: NbToastrService, private router: Router,
              private adminService: AdminService, private windowService: NbWindowService) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.adminService.getPermit(id).subscribe(s => {
      this.permit = s;
      this.permit.dateCreation = new Date(s.dateCreation);
      this.permit.dateExpiration = new Date(s.dateExpiration);
      this.adminService.getCompany(this.permit._id, 'permits').subscribe(x => {
        this.company = x;
      });
    });
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }

  updatePermit(form: NgForm): void {
    if (!form.valid)
      this.showToast('Greška', 'Informacije koje ste uneli nisu tačne!', 'danger');
    else {
      this.permitService.updatePermit(this.permit, this.permit._id).subscribe(u => {
      });
      this.showToast('Uspeh', 'Uspešno ste izmenili informacije!', 'success');
    }
  }

  openPermitsTrashWindow(): void {
    this.windowRef = this.windowService.open(this.viewTrash, {title: 'Lista otpada'});
  }

  updatePermitsTrashMethod(trashList: Catalog[]): void {
    this.permit.trashList = trashList;
    this.permitService.updatePermit(this.permit, this.permit._id).subscribe(x => {
    });
    this.showToast('Uspeh', 'Uspešno ste izmenili informacije!', 'success');
    this.windowRef.close();
  }

  gotoCompany(): void {
    this.router.navigate(['admin/companies', this.company.pib]);
  }

  gotoStorage(): void {
    this.router.navigate(['admin/storages', this.permit.storage._id]);
  }

  dateValid(permit: Permit): Boolean {
    return permit.dateCreation <= permit.dateExpiration;
  }

  private showToast(title: String, message: String, status: NbComponentStatus) {
    this.toastrService.show(
      message,
      title,
      {status});
  }

}
