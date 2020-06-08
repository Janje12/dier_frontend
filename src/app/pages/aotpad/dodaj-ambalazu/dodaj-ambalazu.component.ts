import { Component, OnInit } from '@angular/core';
import { KatalogService } from '../../../@core/service/katalog.service';
import { Ambalaza } from '../../../@core/data/ambalaza';
import { AmblazaService } from '../../../@core/service/amblaza.service';

@Component({
  selector: 'ngx-dodaj-ambalazu',
  styleUrls: ['./dodaj-ambalazu.component.scss'],
  templateUrl: './dodaj-ambalazu.component.html',
})
export class DodajAmbalazuComponent implements OnInit {

  constructor(private katalogService: KatalogService, private ambalazaService: AmblazaService) {
  }

  ngOnInit(): void {
    this.ambalazaService.getVrsteAmbalaza().subscribe(k => {
      this.vrste = k;
    });
  }

  public vrste: string[];

  public ambalaza: Ambalaza = {
    _id: '',
    naziv: '',
    opis: '',
    kolicina: 0,
    povratna: true,
  };

}
