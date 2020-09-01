import { Component, Inject, OnInit } from '@angular/core';
import { getDeepFromObject, NB_AUTH_OPTIONS } from '@nebular/auth';
import { Observable, of } from 'rxjs';
import { Firma } from '../../@core/data/firma';
import { Korisnik } from '../../@core/data/korisnik';
import { KorisnikService } from '../../@core/service/korisnik.service';

@Component({
  selector: 'ngx-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  constructor() {
  }


  ngOnInit(): void {
  }

}
