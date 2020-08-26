import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NbAuthService } from '@nebular/auth';
import { Observable } from 'rxjs';
import { Korisnik, KorisnikData } from '../data/korisnik';

@Injectable()
export class KorisnikService extends KorisnikData {
  constructor(private http: HttpClient, private authService: NbAuthService) {
    super();
  }

  getKorisnik(): Observable<Korisnik[]> {
    return this.http.get<Korisnik[]>('api/korisnik');
  }

  getOneKorisnik(): Observable<Korisnik> {
    let korisnickoIme = '';
    this.authService.onTokenChange().subscribe(t => {
      korisnickoIme = t.getPayload().data.korisnik.korisnickoIme;
    });
    return this.http.get<Korisnik>('api/korisnik/' + korisnickoIme);
  }
}
