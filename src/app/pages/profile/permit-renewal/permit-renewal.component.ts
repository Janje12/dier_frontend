import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { first } from 'rxjs/operators';
import { Permit } from '../../../@core/data/permit';
import { PermitService } from '../../../@core/service/permit.service';
import { RoleService } from '../../../@core/service/role.service';
import { ToastrService } from '../../../@core/service/toastr.service';
import { UserService } from '../../../@core/service/user.service';

@Component({
  selector: 'permit-renewal',
  templateUrl: './permit-renewal.component.html',
  styleUrls: ['./permit-renewal.component.css'],
})
export class PermitRenewalComponent implements OnInit {

  requestType: string;
  permits: Permit[];
  permits$: Observable<Permit[]>;
  selectedPermit: Permit;
  email: string;
  message: string;
  permitType: string;
  trashType: string;

  constructor(private permitService: PermitService, private roleService: RoleService,
              private userService: UserService, private router: Router, private toastrService: ToastrService) {
  }

  ngOnInit(): void {
    this.permitService.getCompaniesPermits(this.roleService.getCompanyID()).pipe(first()).subscribe(p => {
      this.permits = p;
      this.permits$ = of(this.permits);
    });
    const username = this.roleService.getUsername();
    this.userService.getUser(username, 'username').subscribe(u => {
      this.email = u.email;
    });
  }

  sendRequest() {
    if (this.requestType === 'renewal')
      this.permitService.sendPermitRequest(this.email, this.message, this.requestType, this.selectedPermit._id).subscribe(b => {
        if (b) {
          this.toastrService.showToast('Uspeh', 'Uspešno ste poslali zahtev!', 'success');
          setTimeout(() => {
            this.router.navigate(['pages']);
          }, 1500);
        } else {
          this.toastrService.showToast('Greška', 'Pogledajte opet sve informacije!', 'warning');
        }
      }, (err) => {
        this.toastrService.showToast('Greška', 'Pogledajte opet sve informacije!', 'warning');
      });
    else
      this.permitService.sendPermitRequest(this.email, this.message, this.requestType, undefined, this.trashType, this.permitType).subscribe(b => {
        if (b) {
          this.toastrService.showToast('Uspeh', 'Uspešno ste poslali zahtev!', 'success');
          setTimeout(() => {
            this.router.navigate(['pages']);
          }, 1500);
        } else {
          this.toastrService.showToast('Greška', 'Pogledajte opet sve informacije!', 'warning');
        }
      }, (err) => {
        this.toastrService.showToast('Greška', 'Pogledajte opet sve informacije!', 'warning');
      });
  }

}
