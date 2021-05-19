import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { NbAuthService } from '@nebular/auth';
import { first } from 'rxjs/operators';
import { RegisterService } from '../@core/service/register.service';

@Injectable()
export class RegisterGuard implements CanActivate {

  constructor(private authService: NbAuthService, private router: Router,
              private registerService: RegisterService) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.authService.isAuthenticated().pipe().subscribe(authenticated => {
      if (authenticated) {
        this.router.navigate(['pages']);
      }
    });
    let pass = true;
    const registerPath = next.routeConfig.path;
    if (registerPath === 'register-company') {
      this.registerService.getUser().pipe(first()).subscribe(u => {
        if (u.username === '' || u.email === '') {
          this.router.navigate(['auth', 'register-user']);
          pass = false;
        }
      });
    } else if (registerPath === 'register-operations') {
      this.registerService.getCompany().pipe(first()).subscribe(c => {
        if (c.pib === '' || c.mat === '') {
          this.router.navigate(['auth', 'register-company']);
          pass = false;
        }
      });
    } else if (registerPath === 'register-informations') {
      this.registerService.getOperations().pipe(first()).subscribe(o => {
        if (o.length === 0) {
          this.router.navigate(['auth', 'register-operations']);
          pass = false;
        }
      });
    } else if (registerPath === 'register-confirmation') {
      this.registerService.getCompany().pipe(first()).subscribe(c => {
        if (c.pib === '' || c.mat === '' || c.operations.length === 0 || c.manager === '') {
          this.router.navigate(['auth', 'register-informations']);
          pass = false;
        }
      });
    }
    return pass;
  }

}
