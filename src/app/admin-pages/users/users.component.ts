import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbComponentStatus, NbToastrService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { KorisnikService } from '../../@core/service/korisnik.service';
import { USER_SETTINGS } from './userTable.settings';

@Component({
  selector: 'ngx-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {

  usersSource: LocalDataSource = new LocalDataSource();
  userSettings: any = USER_SETTINGS;

  constructor(private korisnikService: KorisnikService, private toastrService: NbToastrService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.korisnikService.getKorisnik().subscribe(k => {
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
      this.korisnikService.createKorisnik(user).subscribe(u => {
      });
      confirm.resolve();
      this.showToast('Uspeh!', 'Uspešno ste kreirali ' + user.korisnickoIme, 'success');
    } catch (err) {
      confirm.reject();
      this.showToast('Greška!', 'Došlo je do greške do kreiranja ' + user.korisnickoIme +
        '. Molimo vas pokušajte kasnije.', 'danger');
    }
  }

  updateUser({newData: user, confirm: confirm}): void {
    try {
      this.korisnikService.updateKorisnik(user).subscribe(u => {
      });
      confirm.resolve();
      this.showToast('Uspeh!', 'Uspešno ste uredili ' + user.korisnickoIme, 'success');
    } catch (err) {
      confirm.reject();
      this.showToast('Greška!', 'Došlo je do greške dok ste pokušali da promenite ' + user.korisnickoIme +
        '. Molimo vas pokušajte kasnije.', 'danger');
    }
  }

  deleteUser({data: user, confirm: confirm}): void {
    try {
      this.korisnikService.deleteKorisnik(user).subscribe(u => {
      });
      confirm.resolve();
      this.showToast('Uspeh!', 'Uspešno ste obrisali ' + user.korisnickoIme, 'success');
    } catch (err) {
      confirm.reject();
      this.showToast('Greška!', 'Došlo je do greške dok ste pokušali da obrišete ' + user.korisnickoIme +
        '. Molimo vas pokušajte kasnije.', 'danger');
    }
  }

  userInfo({data: user}): void {
    this.router.navigate(['admin/korisnici', user.korisnickoIme]);
  }

}
