import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NbComponentStatus, NbToastrService, NbWindowRef, NbWindowService } from '@nebular/theme';
import { SpecialWaste } from '../../../../@core/data/specialWaste';
import { RoleService } from '../../../../@core/service/role.service';
import { SpecialWasteService } from '../../../../@core/service/specialWaste.service';

@Component({
  selector: 'widget-most-used-special-waste',
  templateUrl: './most-used-special-waste.component.html',
  styleUrls: ['./most-used-special-waste.component.css'],
})
export class MostUsedSpecialWasteComponent implements OnInit {
  @ViewChild('addSpecialWaste', {read: TemplateRef}) addTrashTemplate: TemplateRef<HTMLElement>;
  private windowRef: NbWindowRef;

  operations: { exists: boolean, production: boolean, import: boolean, export: boolean };
  specialWastes: SpecialWaste[] = [];
  selectedSpecialWaste: SpecialWaste;
  selectedType: string;
  productionWastes: SpecialWaste[];
  importWastes: SpecialWaste[];
  exportWastes: SpecialWaste[];

  constructor(private toastrService: NbToastrService, private speicalWasteService: SpecialWasteService,
              private roleService: RoleService, private windowService: NbWindowService) {
  }

  ngOnInit(): void {
    this.roleService.getOperations(undefined, true).subscribe(o => {
      this.operations = o.specialWasteOperations;
    });
    this.updateSpecialWastes();
  }

  private updateSpecialWastes() {
    this.specialWastes = [];
    this.speicalWasteService.getCompaniesSpecialWastes(this.roleService.getCompanyID())
      .subscribe(x => {
        this.specialWastes = x;
        this.productionWastes = this.specialWastes.filter(t => t.operationTypes.includes('Proizvodnja'));
        this.importWastes = this.specialWastes.filter(t => t.operationTypes.includes('Uvoz'));
        this.exportWastes = this.specialWastes.filter(t => t.operationTypes.includes('Izvoz'));
      });
  }

  private openAddSpecialWasteWindow(specialWaste: SpecialWaste, operationType: string) {
    this.selectedSpecialWaste = specialWaste;
    this.selectedType = operationType;
    this.windowRef = this.windowService.open(this.addTrashTemplate,
      {title: 'Dodaj kolicinu: ' + this.selectedSpecialWaste.name});
  }

  public closeSpecialWasteWindow() {
    this.windowRef.close();
    this.showToast('Uspeh',
      'Uspešno ste dodali ' + this.selectedSpecialWaste.name,
      'success');
  }

  private showToast(title: String, message: String, status: NbComponentStatus) {
    this.toastrService.show(
      message,
      title,
      {status});
  }
}
