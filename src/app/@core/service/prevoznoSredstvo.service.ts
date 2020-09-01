import { HttpClient } from '@angular/common/http';
import { NbAuthService } from '@nebular/auth';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { PrevoznoSredstvo, PrevoznoSredstvoData } from '../data/prevoznoSredstvo';

@Injectable()
export class PrevoznoSredstvoService extends PrevoznoSredstvoData {
  private readonly apiUrl: string;

  constructor(private http: HttpClient, private authService: NbAuthService) {
    super();
    this.apiUrl = environment.apiUrl;
  }

  getPrevoznoSredstvo(): Observable<PrevoznoSredstvo[]> {
    return undefined;
  }

  updatePrevoznoSredstvo(prevoznoSredstvo: PrevoznoSredstvo): Observable<PrevoznoSredstvo> {
    return this.http.patch<PrevoznoSredstvo>(this.apiUrl + '/api/prevoznosredstvo/'
      + prevoznoSredstvo._id, prevoznoSredstvo);
  }

  getPrevoznoSredstvoFirme(): Observable<PrevoznoSredstvo[]> {
    let firmaID = '';
    this.authService.getToken().subscribe(x => {
      firmaID = x.getPayload().data.firma._id;
    });
    return this.http.get<PrevoznoSredstvo[]>(this.apiUrl + '/api/prevoznosredstvo/firma/' + firmaID);
  }



}
