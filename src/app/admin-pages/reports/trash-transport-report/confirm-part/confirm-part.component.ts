import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DKO } from '../../../../@core/data/dko';
import { Trash } from '../../../../@core/data/trash';
import { Storage } from '../../../../@core/data/storage';
import { DkoService } from '../../../../@core/service/dko.service';

@Component({
  selector: 'confirm-part',
  templateUrl: './confirm-part.component.html',
  styleUrls: ['./confirm-part.component.css'],
})
export class ConfirmPartComponent implements OnInit {
  @Input() storage: Storage;
  @Input() trash: Trash;
  dko: DKO;

  constructor(private dkoService: DkoService, private router: Router) {
  }

  ngOnInit(): void {
    this.dkoService.getDKO().subscribe(d => {
      this.dko = d;
      for (let i = 0; i < 5; i++) {
        if (this.dko.rutaKretanja[i] === undefined || this.dko.rutaKretanja[i] === '')
          this.dko.rutaKretanja.splice(i, 1);
      }
    });
  }

  private downloadFile(data: Response) {
    // @ts-ignore
    const blob = new Blob([data], {type: 'application/pdf'});
    const url = window.URL.createObjectURL(blob);
    window.open(url);
  }

  generateDKO(): void {
    this.dkoService.generateDKO(this.dko, this.storage._id, this.trash._id).subscribe(data => {
      if (!this.dko.otpad.indexNumber.endsWith('*'))
        this.downloadFile(data);
      this.router.navigate(['/admin/izvestaji/firme/' + this.dko.firmaProizvodjac.pib]);
    });
  }


}
