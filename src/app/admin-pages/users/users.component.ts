import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbComponentStatus, NbToastrService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { AdminService } from '../../@core/service/admin.service';
import { UserService } from '../../@core/service/user.service';
import { USER_SETTINGS } from './userTable.settings';

@Component({
  selector: 'admin-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {

  usersSource: LocalDataSource = new LocalDataSource();
  userSettings: any = USER_SETTINGS;

  constructor(private adminService: AdminService, private toastrService: NbToastrService,
              private router: Router, private userService: UserService) {
  }

  ngOnInit(): void {
    this.adminService.getUsers().subscribe(k => {
      this.usersSource.load(k);
    });
  }


  private showToast(title: String, message: String, status: NbComponentStatus) {
    this.toastrService.show(
      message,
      title,
      {status});
  }

  // TOASTR SERVICE THAT WORKS OFF OF the API!
  createUser({newData: user, confirm: confirm}): void {
    try {
      this.userService.createUser(user).subscribe(u => {
      });
      confirm.resolve();
      this.showToast('Uspeh!', 'Uspešno ste kreirali ' + user.username, 'success');
    } catch (err) {
      confirm.reject();
      this.showToast('Greška!', 'Došlo je do greške do kreiranja ' + user.username +
        '. Molimo vas pokušajte kasnije.', 'danger');
    }
  }

  updateUser({newData: user, confirm: confirm}): void {
    try {
      this.userService.updateUser(user, user._id).subscribe(u => {
      });
      confirm.resolve();
      this.showToast('Uspeh!', 'Uspešno ste uredili ' + user.username, 'success');
    } catch (err) {
      confirm.reject();
      this.showToast('Greška!', 'Došlo je do greške dok ste pokušali da promenite ' + user.username +
        '. Molimo vas pokušajte kasnije.', 'danger');
    }
  }

  deleteUser({data: user, confirm: confirm}): void {
    try {
      if (!window.confirm('Da li ste sigurni da želite da obrišete ' + user.username + '?'))
        return;
      this.userService.deleteUser(user._id).subscribe(x => {
      });
      confirm.resolve();
      this.showToast('Uspeh!', 'Uspešno ste obrisali ' + user.username, 'success');
    } catch (err) {
      confirm.reject();
      this.showToast('Greška!', 'Došlo je do greške dok ste pokušali da obrišete ' + user.username +
        '. Molimo vas pokušajte kasnije.', 'danger');
    }
  }

  userInfo({data: user}): void {
    this.router.navigate(['admin/users', user.username]);
  }

}
