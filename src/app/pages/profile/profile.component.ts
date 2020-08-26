import { Component, OnInit } from '@angular/core';
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

  firma$: Observable<Firma>;
  korisnik$: Observable<Korisnik>;

  constructor(private korisnikService: KorisnikService) {
  }

  ngOnInit(): void {
    this.korisnikService.getOneKorisnik().subscribe(k => {
      this.korisnik$ = of(k);
      this.firma$ = of(k.firma);
    });
  }

}
