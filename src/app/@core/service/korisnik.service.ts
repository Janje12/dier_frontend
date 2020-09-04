import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NbAuthService } from '@nebular/auth';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Korisnik, KorisnikData } from '../data/korisnik';

@Injectable()
export class KorisnikService extends KorisnikData {
  private readonly apiUrl: string;

  constructor(private http: HttpClient, private authService: NbAuthService) {
    super();
    this.apiUrl = environment.apiUrl;
  }

  getKorisnik(): Observable<Korisnik[]> {
    return this.http.get<Korisnik[]>(this.apiUrl + '/api/korisnik');
  }


  findKorisnik(value: string, type: string): Observable<Korisnik> {
    return this.http.get<Korisnik>(this.apiUrl + '/api/korisnik/admin/' + type + '/' + value);
  }

  createKorisnik(korisnik: Korisnik): Observable<Korisnik> {
    return this.http.post<Korisnik>(this.apiUrl + '/api/korisnik', korisnik);
  }

  updateKorisnik(korisnik: Korisnik): Observable<Korisnik> {
    return this.http.patch<Korisnik>(this.apiUrl + '/api/korisnik/' + korisnik._id, korisnik);
  }

  deleteKorisnik(korisnik: Korisnik): Observable<Korisnik> {
    return this.http.delete<Korisnik>(this.apiUrl + '/api/korisnik/' + korisnik._id);
  }

  getCurrentKorisnik(): Observable<Korisnik> {
    let korisnickoIme = '';
    this.authService.onTokenChange().subscribe(t => {
      if (t !== null) {
        korisnickoIme = t.getPayload().data.korisnik.korisnickoIme;
      }
    });
    return this.http.get<Korisnik>(this.apiUrl + '/api/korisnik/profile/' + korisnickoIme);
  }

}
