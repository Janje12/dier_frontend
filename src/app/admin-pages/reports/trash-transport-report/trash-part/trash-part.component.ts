import { Component, Input, isDevMode, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { DKO } from '../../../../@core/data/dko';
import { Trash } from '../../../../@core/data/trash';
import { DkoService } from '../../../../@core/service/dko.service';

@Component({
  selector: 'trash-part',
  templateUrl: './trash-part.component.html',
  styleUrls: ['./trash-part.component.css'],
})
export class TrashPartComponent implements OnInit {
  @Input() trash: Trash;
  @Input() trashType: String;
  dko: DKO;
  fizickaStanja: string[] = ['Čvrsto', 'Tečno', 'Gasovito', 'Prah'];

  constructor(private dkoService: DkoService) {
  }

  ngOnInit(): void {
    this.dkoService.getDKO().subscribe(d => {
      this.dko = d;
      this.dko.otpad = this.trash;
      this.dko.masaOtpada = this.trash.amount;
      this.dko.datumIspitivanja = this.trash.examinationDate;
      this.dko.sifraIspitivanja = this.trash.examinationCode;
      this.dko.fizickoStanje = this.trash.state;
      this.dko.qLista = this.trash.qList;
      this.dko.nacinPakovanja = this.trash.packaging;
      if (isDevMode()) {
        this.dko.vrstaOtpada = 'indutstrijski';
        this.dko.masaOtpada = 10;
        this.dko.datumIspitivanja = new Date(2020, 3, 4);
        this.dko.sifraIspitivanja = '1234DA';
        this.dko.qLista = 'Q1';
        this.dko.nacinPakovanja = 'Bure';
      }
    });
    this.dkoService.sendDKO(of(this.dko));
  }

}
