import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbAuthService } from '@nebular/auth';

@Component({
  selector: 'auth-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.css'],
})
export class RedirectComponent implements OnInit {

  constructor(private authService: NbAuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.authService.isAuthenticated().subscribe(b => {
        if (!b)
          this.router.navigate(['auth', 'login']);
      },
    );
    this.authService.getToken().subscribe(t => {
      const user = t.getPayload().data.user;
      if (user.role === 'admin') {
        this.router.navigate(['admin']);
      } else {
        this.router.navigate(['pages', 'dashboard']);
      }
    });
  }

}
