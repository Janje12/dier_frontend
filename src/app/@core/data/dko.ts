import { Observable } from 'rxjs';
import { CompanyClient } from './companyClient';
import { Trash } from './trash';

export interface DKO {
  otpad: Trash;
  vrstaOtpada: String;
  qLista: String;
  masaOtpada: Number;
  nacinPakovanja: String;
  fizickoStanje: String;
  sifraIspitivanja: String;
  datumIspitivanja: Date;
  vidPrevoza: String;
  dodatneInformacije: String;
  nacinPostupanja: String;
  rutaKretanja: String[];
  vrstaProizvodjaca: String;
  vrstaVozila: String;
  registarskiBroj: String;
  firmaProizvodjac?: CompanyClient;
  firmaTransport?: CompanyClient;
  firmaPrimalac?: CompanyClient;
  vrstaPrimalaca: String;
  sifraDozvoleProizvodjac?: String;
  datumDozvoleProizvodjac?: Date;
  sifraDozvoleTransport: String;
  datumDozvoleTransport: Date;
  sifraDozvolePrimalac: String;
  datumDozvolePrimalac: Date;
}

export abstract class DKOData {
  abstract getDKO(): Observable<DKO>;
}
