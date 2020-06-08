import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Firma } from '../../@core/data/firma';
import { Korisnik } from '../../@core/data/korisnik';
import { FirmaService } from '../../@core/service/firma.service';
import { KorisnikService } from '../../@core/service/korisnik.service';

@Component({
  selector: 'ngx-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  firma: Firma;
  korisnik: Korisnik;

  constructor(private korisnikService: KorisnikService) {
  }

  ngOnInit(): void {
    this.korisnikService.getKorisnik().subscribe(k => {
      this.korisnik = k;
      console.log(k.firma);
      this.firma = k.firma;
    });
  }

}
