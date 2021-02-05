import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { first } from 'rxjs/operators';
import { DKO } from '../../../@core/data/dko';
import { Company } from '../../../@core/data/company';
import { Trash } from '../../../@core/data/trash';
import { Storage } from '../../../@core/data/storage';
import { DkoService } from '../../../@core/service/dko.service';
import { CompanyService } from '../../../@core/service/company.service';
import { TrashService } from '../../../@core/service/trash.service';
import { StorageService } from '../../../@core/service/storage.service';

@Component({
  selector: `trash-transport-report`,
  templateUrl: './trash-transport-report.component.html',
  styleUrls: ['./trash-transport-report.component.css'],
})
export class TrashTransportReportComponent implements OnInit {

  company: Company;
  company$: Observable<Company>;
  storage: Storage;
  trash: Trash;
  trashType: String;
  trash$: Observable<Trash>;
  dko: DKO;

  constructor(private route: ActivatedRoute, private notpadService: TrashService,
              private skladisteService: StorageService, private firmaService: CompanyService,
              private dkoService: DkoService) {
  }

  ngOnInit(): void {
    const trashID = this.route.snapshot.params['trash'];
    const storageID = this.route.snapshot.params['storage'];
    this.notpadService.getTrash(trashID).subscribe(t => {
      this.trash = t;
      this.trash$ = of(t);
      this.trashType = this.trash.indexNumber.endsWith('*') ? 'Opasnog' : 'Neopasnog';
    });
    this.skladisteService.getStorage(storageID).subscribe(s => {
      this.storage = s;
      this.dkoService.getDKO().subscribe(d => {
        this.dko = d;
        this.dko.rutaKretanja = [this.storage.address.location.townshipName, ...this.dko.rutaKretanja];
        if (!this.storage.__t)
          this.dko.vrstaProizvodjaca = 'production';
        else if (this.storage.__t === 'SkladisteTretman')
          this.dko.vrstaProizvodjaca = 'treatment';
        else
          this.dko.vrstaProizvodjaca = 'storage';
      });
      this.dkoService.sendDKO(of(this.dko));
    });
    this.firmaService.getCompany(storageID, 'skladista').pipe(first()).subscribe(c => {
      this.company = c;
      this.company$ = of(c);
    });
  }

}
