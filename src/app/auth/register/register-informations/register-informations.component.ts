import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbAccordionComponent, NbComponentStatus, NbToastrService } from '@nebular/theme';
import { first } from 'rxjs/operators';
import { RegisterService } from '../../../@core/service/register.service';
import { RoleService } from '../../../@core/service/role.service';
import { TrashPermitComponent } from './trash/trash-permit/trash-permit.component';
import { TrashStorageComponent } from './trash/trash-storage/trash-storage.component';
import { TrashTransportComponent } from './trash/trash-transport/trash-transport.component';

@Component({
  selector: 'register-informations',
  templateUrl: './register-informations.component.html',
  styleUrls: ['./register-informations.component.css'],
})
export class RegisterInformationsComponent implements OnInit {
  @ViewChild('productionRef')
  private productionRef: TrashStorageComponent;
  @ViewChild('transportRef')
  private transportRef: TrashTransportComponent;
  @ViewChild('collectorRef')
  private collectorRef: TrashPermitComponent;
  @ViewChild('treatmentRef')
  private treatmentRef: TrashStorageComponent;
  @ViewChild('dumpRef')
  private dumpRef: TrashStorageComponent;
  @ViewChild('cacheRef')
  private cacheRef: TrashStorageComponent;

  valid: boolean = false;
  operations: {
    production: boolean,
    transport: boolean,
    specialWaste: boolean,
    collector: boolean,
    treatment: boolean,
    disposal: boolean,
    cache: boolean,
  };
  activeTab: string = '';

  constructor(private registerService: RegisterService, private router: Router,
              private toastrService: NbToastrService, private roleService: RoleService,
              private route: ActivatedRoute) {
    this.activeTab = this.route.snapshot.paramMap.get('tab');
  }

  ngOnInit(): void {

    this.registerService.getOperations().pipe(first()).subscribe(o => {
      this.roleService.getOperations(o, true).pipe(first()).subscribe(f => {
        this.operations = f;
      });
    });
  }

  checkCompletion(type: string): any {
    const result = {icon: 'checkmark-circle-outline', status: 'success'};
    if (type === 'production') {
      if (this.productionRef !== undefined && this.operations.production)
        if (this.productionRef.valid)
          return result;
    }
    if (type === 'transport') {
      if (this.transportRef !== undefined && this.operations.transport)
        if (this.transportRef.valid)
          return result;
    }
    if (type === 'collector') {
      if (this.collectorRef !== undefined && this.operations.collector)
        if (this.collectorRef.valid)
          return result;
    }
    if (type === 'treatment') {
      if (this.treatmentRef !== undefined && this.operations.treatment)
        if (this.treatmentRef.valid)
          return result;
    }
    if (type === 'dump') {
      if (this.dumpRef !== undefined && this.operations.disposal)
        if (this.dumpRef.valid)
          return result;
    }
    if (type === 'cache') {
      if (this.cacheRef !== undefined && this.operations.cache)
        if (this.cacheRef.valid)
          return result;
    }
    return {icon: 'alert-triangle-outline', status: 'danger'};
  }

  loading: boolean = false;

  async validateInformation(accordion: NbAccordionComponent) {
    this.loading = true;
    accordion.multi = true;
    accordion.closeAll();
    accordion.openAll();
    setTimeout(async () => {
      this.valid = true;
      if (this.productionRef !== undefined && this.operations.production)
        if (!this.productionRef.checkValid())
          this.valid = false;
      if (this.transportRef !== undefined && this.operations.transport)
        this.valid = await this.transportRef.checkValid();
      if (this.collectorRef !== undefined && this.operations.collector)
          this.valid = await this.collectorRef.checkValid();
      if (this.treatmentRef !== undefined && this.operations.treatment)
        if (!this.treatmentRef.checkValid())
          this.valid = false;
      if (this.dumpRef !== undefined && this.operations.disposal)
        if (!this.dumpRef.checkValid())
          this.valid = false;
      if (this.cacheRef !== undefined && this.operations.cache)
        if (!this.cacheRef.checkValid())
          this.valid = false;
      if (!this.valid) {
        accordion.closeAll();
        accordion.multi = false;
        this.loading = false;
        this.showToast('Greška', 'Ponovo pogledajte unete informacije!', 'warning');
      } else {
        this.router.navigate(['auth/register-confirmation']);
      }
    }, 1000);
  }

  private showToast(title: String, message: String, status: NbComponentStatus) {
    this.toastrService.show(
      message,
      title,
      {status});
  }

}
