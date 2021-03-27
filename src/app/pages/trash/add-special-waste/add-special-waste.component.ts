import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbComponentStatus, NbToastrService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { SpecialWaste } from '../../../@core/data/specialWaste';
import { CatalogService } from '../../../@core/service/catalog.service';
import { RoleService } from '../../../@core/service/role.service';
import { SpecialWasteService } from '../../../@core/service/specialWaste.service';
import { ToastrService } from '../../../@core/service/toastr.service';
import { SPECIAL_WASTE_CATALOG_SETTINGS } from '../specialWasteCatalogTable';

@Component({
  selector: 'add-special-waste',
  templateUrl: './add-special-waste.component.html',
  styleUrls: ['./add-special-waste.component.css'],
})
export class AddSpecialWasteComponent implements OnInit {

  settings: any = SPECIAL_WASTE_CATALOG_SETTINGS;
  checkIssues: boolean = false;
  catalog: LocalDataSource = new LocalDataSource();
  specialWasteType: string;
  operations: { import: boolean, export: boolean, production: false };
  operation: string;
  otherOperations: string[] = [];
  specialWasteClasses: Set<string>;
  specialWaste: SpecialWaste = {
    amount: 0, desc: '', mass: undefined, name: '', unitOfMeasure: 'kg', operationTypes: [],
  };

  constructor(private activatedRoute: ActivatedRoute, private catalogService: CatalogService,
              private specialWasteService: SpecialWasteService, private router: Router,
              private toastrService: ToastrService, private roleService: RoleService) {
    this.activatedRoute.params.subscribe(params => {
      this.operation = params.operation;
      this.specialWasteType = params.trashType;
      this.ngOnInit();
    });
  }

  ngOnInit(): void {
    this.catalogService.getSpecialWaste().subscribe(x => {
      this.catalog.load(x);
      this.specialWasteClasses = new Set();
      x.forEach(d => this.specialWasteClasses.add(d.className));
    });
    this.roleService.getOperations(undefined, undefined, true).subscribe(x => {
      this.operations = x.specialWasteOperations;
    });
    this.otherOperations = [];
    this.specialWaste.operationTypes = [];
    this.operations.production ? this.otherOperations.push('Proizvodnja') : '';
    this.operations.import ? this.otherOperations.push('Uvoz') : '';
    this.operations.export ? this.otherOperations.push('Izvoz') : '';
    this.specialWaste.operationTypes = this.otherOperations;
  }

  checkOperation(operation: string) {
    if (operation === 'Proizvodnja' && this.operation === 'production')
      return true;
    if (operation === 'Uvoz' && this.operation === 'import')
      return true;
    if (operation === 'Izvoz' && this.operation === 'export')
      return true;
    return false;
  }

  onSearch(query: string) {
    if (query === '')
      this.catalog.setFilter([]);
    this.catalog.setFilter([
      {
        field: 'name',
        search: query,
      },
      {
        field: 'className',
        search: query,
      },
    ], false);
  }

  /* doesnt recongize the events data from smart table :P*/
  chooseSpecialWaste({data}) {
    this.specialWaste.name = data.name;
    this.specialWaste.desc = data.desc;
    this.specialWaste.unitOfMeasure = data.unitOfMeasure;
  }

  addOperation(operation: string) {
    if (this.specialWaste.operationTypes.includes(operation))
      this.specialWaste.operationTypes = this.specialWaste.operationTypes.filter(x => x !== operation);
    else
      this.specialWaste.operationTypes.push(operation);
  }

  addSpecialWaste(form: NgForm): void {
    if (form.invalid || isNaN(this.specialWaste.mass)) {
      this.checkIssues = true;
      this.toastrService.showToast('Greška', 'Ispravite sve greške da bi ste dodali PTO.', 'warning');
      return;
    }
    delete this.specialWaste._id;
    this.specialWasteService.createSpecialWaste(this.specialWaste, this.roleService.getCompanyID()).subscribe();
    this.toastrService.showToast('Uspeh', 'Uspešno ste dodali posebeni tok otpada!', 'success');
    this.router.navigate(['pages', 'dashboard']);
  }

}
