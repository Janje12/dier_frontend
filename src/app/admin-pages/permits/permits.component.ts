import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbComponentStatus, NbToastrService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { first } from 'rxjs/operators';
import { Permit } from '../../@core/data/permit';
import { AdminService } from '../../@core/service/admin.service';
import { PermitService } from '../../@core/service/permit.service';
import { PERMIT_SETTINGS } from './permitTable.settings';

@Component({
  selector: 'admin-permits',
  templateUrl: './permits.component.html',
  styleUrls: ['./permits.component.css'],
})
export class PermitsComponent implements OnInit {

  permits: Permit[];
  selectedPermits: LocalDataSource = new LocalDataSource();
  permitSettings: any = PERMIT_SETTINGS;
  companyNames: any[] = [];

  constructor(private permitService: PermitService, private toastrService: NbToastrService,
              private router: Router, private adminService: AdminService) {
  }

  ngOnInit(): void {
    this.adminService.getPermits().pipe(first()).subscribe(s => {
      this.permits = s;
      this.selectedPermits.load(s);
    });
    this.adminService.getCompanyNames('permits').subscribe(t => {
      this.companyNames = t;
    });
  }

  private showToast(title: String, message: String, status: NbComponentStatus) {
    this.toastrService.show(
      message,
      title,
      {status});
  }

  selectPermits(selectedCompany: any) {
    if (selectedCompany === '-') {
      this.selectedPermits.load(this.permits);
    } else {
      let tmp = this.permits;
      tmp = tmp.filter(f => selectedCompany.permits.includes(f._id));
      this.selectedPermits.load(tmp);
    }
  }


  updatePermit({newData: permit, confirm: confirm}): void {
    try {
      this.permitService.updatePermit(permit, permit._id).subscribe(s => {
      });
      confirm.resolve();
      this.showToast('Uspeh!', 'Uspešno ste uredili ' + permit.name, 'success');
    } catch (err) {
      confirm.reject();
      this.showToast('Greška!', 'Došlo je do greške dok ste pokušali da promenite ' + permit.name +
        '. Molimo vas pokušajte kasnije.', 'danger');
    }
  }

  deletePermit({data: permit, confirm: confirm}): void {
    try {
      if (!window.confirm('Da li ste sigurni da želite da obrišete ' + permit.name + '?'))
        return;
      this.permitService.deletePermit(permit._id).subscribe(s => {
      });
      confirm.resolve();
      this.showToast('Uspeh!', 'Uspešno ste obrisali ' + permit.name, 'success');
    } catch (err) {
      confirm.reject();
      this.showToast('Greška!', 'Došlo je do greške dok ste pokušali da obrišete ' + permit.name +
        '. Molimo vas pokušajte kasnije.', 'danger');
    }
  }

  permitInfo({data: permit}): void {
    this.router.navigate(['admin/permits', permit._id]);
  }

}
