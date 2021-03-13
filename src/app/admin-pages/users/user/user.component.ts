import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { getDeepFromObject, NB_AUTH_OPTIONS } from '@nebular/auth';
import { NbComponentStatus, NbToastrService } from '@nebular/theme';
import { User } from '../../../@core/data/user';
import { AdminService } from '../../../@core/service/admin.service';
import { UserService } from '../../../@core/service/user.service';

@Component({
  selector: 'admin-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {

  user: User = {
    email: '', firstName: '', lastName: '', password: '', phone: '', role: '', username: '',
    company: { pib: '', mat: '', address: undefined, name: '', fax: '', email: '', emailReception: '',
      manager: '', legalRep: { firstName: '', lastName: ''},
      nriz: { username: '', password: ''}, telephone: '', occupation: undefined, operations: []},
  };

  constructor(private route: ActivatedRoute, private adminService: AdminService,
              @Inject(NB_AUTH_OPTIONS) protected options = {}, private userService: UserService,
              private toastrService: NbToastrService, private router: Router  ) { }

  ngOnInit(): void {
    const username = this.route.snapshot.paramMap.get('username');
    this.adminService.getUser(username, 'username').subscribe(u => {
      this.user = u;
    });
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }

  updateUser(form: NgForm): void {
    if (!form.valid)
      this.showToast('Greška', 'Informacije koje ste uneli nisu tačne!', 'danger');
    else {
      this.userService.updateUser(this.user, this.user._id).subscribe(u => {
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

  gotoCompany(): void {
    this.router.navigate(['admin/companies', this.user.company.pib]);
  }

}
