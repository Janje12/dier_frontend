import { Injectable, OnInit } from '@angular/core';
import { NbAuthService } from '@nebular/auth';
import { NbMenuItem } from '@nebular/theme';
import { Observable, of } from 'rxjs';
import { first } from 'rxjs/operators';
import { MENU_ITEMS } from '../../pages/pages-menu';

@Injectable()
export class RoleService {

  radFirme: string[];
  operations: {
    proizvodnja: boolean;
    transport: boolean;
    tretman: boolean;
    skladistenje: boolean;
    odlaganje: boolean;
  };
  neopasni: {
    exists: boolean;
    proizvodnja: boolean;
    transport: boolean;
    tretman: boolean;
    skladistenje: boolean;
    odlaganje: boolean;
  };
  opasni: {
    exists: boolean;
    proizvodnja: boolean;
    transport: boolean;
    tretman: boolean;
    skladistenje: boolean;
    odlaganje: boolean;
  };

  constructor(private authService: NbAuthService) {
    this.operations = {
      proizvodnja: false,
      transport: false,
      tretman: false,
      skladistenje: false,
      odlaganje: false,
    };
    this.neopasni = {
      exists: false,
      proizvodnja: false,
      transport: false,
      tretman: false,
      skladistenje: false,
      odlaganje: false,
    };
    this.opasni = {
      exists: false,
      proizvodnja: false,
      transport: false,
      tretman: false,
      skladistenje: false,
      odlaganje: false,
    };
    this.authService.onTokenChange().pipe(first()).subscribe(x => {
      this.radFirme = x.getPayload().data.firma.radFirme;
    });
  }

  findOperations(): Observable<any> {
    this.radFirme.forEach(x => {
      if (x.startsWith('Proizvodnja'))
        this.operations.proizvodnja = true;
      if (x.startsWith('Transport'))
        this.operations.transport = true;
      if (x.startsWith('Tretman'))
        this.operations.tretman = true;
    });
    return of(this.operations);
  }

  findOperationsMenu(): Observable<NbMenuItem[]> {
    const result = MENU_ITEMS.slice(0, 3);
    let tmp;
    for (let i = 0; i < this.radFirme.length; i++) {
      tmp = this.radFirme[i].split(' ');
      switch (tmp[1]) {
        case 'Neopasnog': {
          this.neopasni.exists = true;
          this.fillType(this.neopasni, tmp[0]);
          break;
        }
        case 'Opasnog': {
          this.fillType(this.opasni, tmp[0]);
          break;
        }
        default: {
          break;
        }
      }
    }
    result.concat(this.fillResult(result));
    return of(result);
  }

  private fillResult(result: NbMenuItem[]): NbMenuItem[] {
    let menu_childern, item;
    if (this.neopasni.exists) {
      item = MENU_ITEMS.filter(x => x.title === 'Neopasni otpad')[0];
      menu_childern = item.children;
      item.children = new Array<NbMenuItem>();
      if (this.neopasni.proizvodnja)
        item.children.push(menu_childern.filter(x => x.title === 'Proizvodnja')[0]);
      if (this.neopasni.transport)
        item.children.push(menu_childern.filter(x => x.title === 'Transport')[0]);
      if (this.neopasni.tretman)
        item.children.push(menu_childern.filter(x => x.title === 'Tretman')[0]);
      if (this.neopasni.skladistenje)
        item.children.push(menu_childern.filter(x => x.title === 'Skladistenje')[0]);
      if (this.neopasni.odlaganje)
        item.children.push(menu_childern.filter(x => x.title === 'Odlaganje')[0]);
      result.push(item);
    }
    if (this.opasni.exists) {
      item = MENU_ITEMS.filter(x => x.title === 'Neopasni otpad')[0];
      menu_childern = item.children;
      item.children = new Array<NbMenuItem>();
      if (this.opasni.proizvodnja)
        item.children.push(menu_childern.filter(x => x.title === 'Proizvodnja')[0]);
      if (this.opasni.transport)
        item.children.push(menu_childern.filter(x => x.title === 'Transport')[0]);
      if (this.opasni.tretman)
        item.children.push(menu_childern.filter(x => x.title === 'Tretman')[0]);
      if (this.opasni.skladistenje)
        item.children.push(menu_childern.filter(x => x.title === 'Skladistenje')[0]);
      if (this.opasni.odlaganje)
        item.children.push(menu_childern.filter(x => x.title === 'Odlaganje')[0]);
      result.push(item);
    }
    return result;
  }

  private fillType(type: any, typeGiven: string) {
    switch (typeGiven) {
      case 'Proizvodnja': {
        type.proizvodnja = true;
        break;
      }
      case 'Transport': {
        type.transport = true;
        break;
      }
      case 'Tretman': {
        type.tretman = true;
        break;
      }
      case 'Skladistenje': {
        type.skladistenje = true;
        break;
      }
      case 'Odlaganje': {
        type.odlaganje = true;
        break;
      }
      default: {
        break;
      }
    }
  }
}
