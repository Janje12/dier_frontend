import { Injectable } from '@angular/core';
import { NbComponentStatus, NbToastrService } from '@nebular/theme';

@Injectable({
  providedIn: 'root',
})
export class ToastrService {

  constructor(private toastrService: NbToastrService) {
  }

  showToast(title: String, message: String, status: NbComponentStatus, duration: number = 3000) {
    this.toastrService.show(
      message,
      title,
      {status, duration});
  }

}
