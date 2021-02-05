import { Component, OnInit } from '@angular/core';
import { Storage, StorageCache, StorageDump, StorageTreatment } from '../../@core/data/storage';
import { RoleService } from '../../@core/service/role.service';
import { StorageService } from '../../@core/service/storage.service';

@Component({
  selector: 'pages-storage-containers',
  templateUrl: './storage-containers.component.html',
  styleUrls: ['./storage-containers.component.css'],
})
export class StorageContainersComponent implements OnInit {

  operations: { production: false, transport: false, treatment: false, disposal: false, cache: false };
  allStorage: Storage[] = [];
  storageProduction: Storage[] = [];
  storageTreatment: StorageTreatment[] = [];
  storageDisposal: StorageDump[] = [];
  storageCache: StorageCache[] = [];
  loading: boolean = false;

  constructor(private roleService: RoleService, private storageService: StorageService) {
  }

  ngOnInit() {
    this.roleService.getOperations().subscribe(x => {
      this.operations = x;
    });
    this.updateStorage();
  }

  updateStorage() {
    this.loading = true;
    this.allStorage = [];
    this.storageDisposal = [];
    this.storageProduction = [];
    this.storageTreatment = [];
    this.storageCache = [];
    this.storageService.getCompaniesStorage( this.roleService.getCompanyID()).subscribe(s => {
      this.allStorage = s;
      for (const x of this.allStorage) {
        if (x.__t === undefined)
          this.storageProduction.push(x);
        else if (x.__t === 'StorageTreatment')
          this.storageTreatment.push(<StorageTreatment>x);
        else if (x.__t === 'StorageDump')
          this.storageDisposal.push(<StorageDump>x);
        else if (x.__t === 'StorageCache')
          this.storageCache.push(<StorageCache>x);
      }
      this.loading = false;
    });
  }

}
