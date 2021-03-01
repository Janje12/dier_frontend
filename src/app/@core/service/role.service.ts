import { Injectable } from '@angular/core';
import { NbAuthService } from '@nebular/auth';
import { NbMenuItem } from '@nebular/theme';
import { Observable, of } from 'rxjs';
import { MENU_ITEMS } from '../../pages/pages-menu';
import { CompanyOperations } from '../data/companyOperations';

@Injectable()
export class RoleService {

  private menu_items: NbMenuItem[] = [];
  private companyOperations: string[] = [];
  private operations: CompanyOperations;
  private companyID: string;
  private username: string;

  constructor(authService: NbAuthService) {
    authService.isAuthenticated().subscribe(x => {
      if (x) {
        authService.getToken().subscribe(t => {
          const payload = t.getPayload();
          this.companyID = payload.data.company._id;
          this.username = payload.data.user.username;
          this.companyOperations = payload.data.company.operations;
        });
      }
    });
    MENU_ITEMS.forEach(val => this.menu_items.push(Object.assign({}, val)));
    this.operations = {
      operations: {
        cache: false,
        disposal: false,
        production: false,
        transport: false,
        collector: false,
        treatment: false,
        specialWaste: false,
      },
      safeTrashOperations: {
        cache: false,
        disposal: false,
        exists: false,
        production: false,
        transport: false,
        collector: false,
        treatment: false,
      },
      unsafeTrashOperations: {
        cache: false,
        disposal: false,
        exists: false,
        production: false,
        collector: false,
        transport: false,
        treatment: false,
      },
      specialWasteOperations: {
        exists: false,
        production: false,
        import: false,
        export: false,
      },
    };
  }

  public getCompanyID(): string {
    return this.companyID;
  }

  public getUsername(): string {
    return this.username;
  }

  public getOperations(companyOperations?: string[], getFullOperations = false): Observable<any> {
    if (companyOperations !== undefined)
      this.clearOperations();
    this.findOperations(companyOperations);
    if (getFullOperations)
      return of(this.operations);
    else
      return of(this.operations.operations);
  }

  public getOperationsMenu(companyOperations?: string[]): Observable<NbMenuItem[]> {
    this.findOperations(companyOperations);
    this.menu_items = [];
    MENU_ITEMS.forEach(val => this.menu_items.push(Object.assign({}, val)));
    const storageMenu = this.operations.safeTrashOperations.exists || this.operations.unsafeTrashOperations.exists;
    const result = this.menu_items.slice(0, 2);
    result.concat(this.fillResult(result));
    return of(result);
  }

  public clearOperations(): void {
    for (const key in Object.keys(this.operations)) {
      if (this.operations.hasOwnProperty(key)) {
        this.operations[key] = false;
      }
    }
  }

  private findOperations(companyOperations?: string[]) {
    this.companyOperations = companyOperations ? companyOperations : this.companyOperations;
    let tmp;
    for (let i = 0; i < this.companyOperations.length; i++) {
      tmp = this.companyOperations[i].split(' ');
      switch (tmp[1]) {
        case 'Neopasnog': {
          if (tmp[0] !== 'Transport' || tmp[0] !== 'Sakupljac')
            this.operations.safeTrashOperations.exists = true;
          this.fillType(this.operations.safeTrashOperations, tmp[0]);
          break;
        }
        case 'Opasnog': {
          if (tmp[0] !== 'Transport' || tmp[0] !== 'Sakupljac')
            this.operations.unsafeTrashOperations.exists = true;
          this.fillType(this.operations.unsafeTrashOperations, tmp[0]);
          break;
        }
        case 'Posebnih': {
          this.operations.specialWasteOperations.exists = true;
          this.fillType(this.operations.specialWasteOperations, tmp[0]);
          break;
        }
        default: {
          break;
        }
      }
    }
  }

  private fillResult(result: NbMenuItem[]): NbMenuItem[] {
    let menu_childern, item;
    if (this.operations.safeTrashOperations.exists) {
      item = this.menu_items.filter(x => x.title === 'Neopasni otpad')[0];
      menu_childern = item.children;
      item.children = new Array<NbMenuItem>();
      if (this.operations.safeTrashOperations.production)
        item.children.push(menu_childern.filter(x => x.title === 'Proizvodnja')[0]);
      if (this.operations.safeTrashOperations.treatment)
        item.children.push(menu_childern.filter(x => x.title === 'Tretman')[0]);
      if (this.operations.safeTrashOperations.cache)
        item.children.push(menu_childern.filter(x => x.title === 'Skladištenje')[0]);
      if (this.operations.safeTrashOperations.disposal)
        item.children.push(menu_childern.filter(x => x.title === 'Odlaganje')[0]);
      result.push(item);
    }
    if (this.operations.unsafeTrashOperations.exists) {
      item = MENU_ITEMS.filter(x => x.title === 'Opasni otpad')[0];
      menu_childern = item.children;
      item.children = new Array<NbMenuItem>();
      if (this.operations.unsafeTrashOperations.production)
        item.children.push(menu_childern.filter(x => x.title === 'Proizvodnja')[0]);
      if (this.operations.unsafeTrashOperations.treatment)
        item.children.push(menu_childern.filter(x => x.title === 'Tretman')[0]);
      if (this.operations.unsafeTrashOperations.cache)
        item.children.push(menu_childern.filter(x => x.title === 'Skladištenje')[0]);
      if (this.operations.unsafeTrashOperations.disposal)
        item.children.push(menu_childern.filter(x => x.title === 'Odlaganje')[0]);
      result.push(item);
    }
    if (this.operations.specialWasteOperations.exists) {
      item = MENU_ITEMS.filter(x => x.title === 'Posebni tokovi otpada')[0];
      menu_childern = item.children;
      item.children = new Array<NbMenuItem>();
      if (this.operations.specialWasteOperations.production)
        item.children.push(menu_childern.filter(x => x.title === 'Proizvodnja')[0]);
      if (this.operations.specialWasteOperations.import)
        item.children.push(menu_childern.filter(x => x.title === 'Uvoz')[0]);
      if (this.operations.specialWasteOperations.export)
        item.children.push(menu_childern.filter(x => x.title === 'Izvoz')[0]);
      result.push(item);
    }
    return result;
  }

  private fillType(type: any, typeGiven: string) {
    switch (typeGiven) {
      case 'Proizvodnja': {
        if (type.import === undefined) {
          this.operations.operations.production = true;
          type.production = true;
        } else {
          this.operations.specialWasteOperations.production = true;
          this.operations.operations.specialWaste = true;
        }
        break;
      }
      case 'Transport': {
        this.operations.operations.transport = true;
        type.transport = true;
        break;
      }
      case 'Sakupljac': {
        this.operations.operations.collector = true;
        type.collector = true;
        break;
      }
      case 'Tretman': {
        this.operations.operations.treatment = true;
        type.treatment = true;
        break;
      }
      case 'Skladištenje': {
        this.operations.operations.cache = true;
        type.cache = true;
        break;
      }
      case 'Odlaganje': {
        this.operations.operations.disposal = true;
        type.disposal = true;
        break;
      }
      case 'Uvoz': {
        this.operations.specialWasteOperations.import = true;
        this.operations.operations.specialWaste = true;
        break;
      }
      case 'Izvoz': {
        this.operations.specialWasteOperations.export = true;
        this.operations.operations.specialWaste = true;
        break;
      }
      default: {
        break;
      }
    }
  }

}
