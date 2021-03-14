import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { first } from 'rxjs/operators';
import { RoleService } from '../../../@core/service/role.service';
import { UserService } from '../../../@core/service/user.service';

@Component({
  selector: 'contact-form-popup',
  templateUrl: './contact-form-popup.component.html',
  styleUrls: ['./contact-form-popup.component.css'],
})
export class ContactFormPopupComponent implements OnInit {
  @Output() finished: EventEmitter<boolean> = new EventEmitter<boolean>();

  email: string;
  username: string;
  title: string;
  message: string;

  constructor(private userService: UserService, private roleService: RoleService) {
  }

  ngOnInit(): void {
    this.username = this.roleService.getUsername();
    this.userService.getUser(this.username, 'username').pipe(first()).subscribe(x => {
      this.email = x.email;
    });
  }

  sendContact(): void {
    this.userService.reportBug(this.username, this.title, this.message, this.email).subscribe(x => {
    });
    this.finished.emit(true);
  }

}
