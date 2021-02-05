import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { DKO, DKOData } from '../data/dko';

@Injectable()
export class DkoService extends DKOData {
  private readonly apiUrl: string;

  constructor(private http: HttpClient) {
    super();
    this.apiUrl = environment.apiUrl;
    this.dko = {
      datumDozvolePrimalac: new Date(),
      datumDozvoleTransport: new Date(),
      datumIspitivanja: new Date(),
      dodatneInformacije: '',
      fizickoStanje: '',
      vrstaProizvodjaca: '',
      masaOtpada: 0,
      nacinPakovanja: '',
      nacinPostupanja: '',
      otpad: undefined,
      qLista: '',
      registarskiBroj: '',
      rutaKretanja: new Array(5),
      sifraDozvolePrimalac: '',
      sifraDozvoleTransport: '',
      sifraIspitivanja: '',
      vidPrevoza: '',
      vrstaOtpada: '',
      vrstaPrimalaca: '',
      vrstaVozila: '',
    };
    /*if (isDevMode()) {
     this.dko = {
     datumDozvolePrimalac: new Date(),
     datumDozvoleTransport: new Date(),
     datumIspitivanja: new Date(),
     dodatneInformacije: '',
     firmaPrimalac: undefined,
     firmaProizvodjac: undefined,
     firmaTransport: undefined,
     fizickoStanje: '',
     masaOtpada: 0,
     nacinPakovanja: '',
     nacinPostupanja: 'R1',
     otpad: undefined,
     qLista: '',
     registarskiBroj: '',
     rutaKretanja: [],
     sifraDozvolePrimalac: '',
     sifraDozvoleTransport: '',
     sifraIspitivanja: '',
     vrstaProizvodjaca: '',
     vidPrevoza: 'drumski',
     vrstaOtpada: '',
     vrstaPrimalaca: 'treatment',
     vrstaVozila: '',
     };
     this.dko.rutaKretanja = ['Kosjeric', 'Valjevo', 'Sabac', 'Novi Sad'];
     }*/
  }

  private dko: DKO;

  sendSyncDKO(dko: DKO): void {
    this.dko = dko;
  }

  sendDKO(dko: Observable<DKO>): void {
    dko.subscribe(x => {
      this.dko = x;
    });
  }

  getDKO(): Observable<DKO> {
    return of(this.dko);
  }

  generateDKO(dko: DKO, storageID: string, trashID: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/pdf');
    return this.http.post(this.apiUrl + '/api/dko',
      {dko: dko, skladiste: storageID, trash: trashID}, {headers: headers, responseType: 'blob'});
  }

}

