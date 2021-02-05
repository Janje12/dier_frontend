import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NbComponentStatus, NbToastrService, NbWindowRef, NbWindowService } from '@nebular/theme';
import { Permit } from '../../../../@core/data/permit';
import { Catalog } from '../../../../@core/data/catalog';
import { PermitService } from '../../../../@core/service/permit.service';
import { RoleService } from '../../../../@core/service/role.service';
import { PERMIT_SETTINGS } from './transport-permits.settings';

@Component({
  selector: 'widget-transport-permits',
  templateUrl: './transport-permits.component.html',
  styleUrls: ['./transport-permits.component.css'],
})
export class TransportPermitsComponent implements OnInit {
  @ViewChild('viewTrash', {read: TemplateRef}) viewTrash: TemplateRef<HTMLElement>;

  private windowRef: NbWindowRef;
  selectedPermit: Permit;
  settings: {} = PERMIT_SETTINGS;
  transportPermits: Permit[] = [];

  constructor(private permitService: PermitService, private windowService: NbWindowService,
              private toastrService: NbToastrService, private roleService: RoleService) {
  }

  ngOnInit(): void {
    this.permitService.getCompaniesPermits('transport', this.roleService.getCompanyID()).subscribe(x => {
      this.transportPermits = x;
    });
  }

  openPermitsTrashWindow({data: permit}): void {
    this.selectedPermit = permit;
    this.windowRef = this.windowService.open(this.viewTrash, {title: 'Lista otpada'});
  }

  updatePermitsTrashMethod(trashList: Catalog[]): void {
    this.selectedPermit.trashList = trashList;
    this.permitService.updatePermit(this.selectedPermit, this.selectedPermit._id).subscribe(x => {
    });
    this.showToast('Uspeh', 'Uspešno ste izmenili informacije!', 'success');
    this.windowRef.close();
  }

  private showToast(title: String, message: String, status: NbComponentStatus) {
    this.toastrService.show(
      message,
      title,
      {status});
  }
}
