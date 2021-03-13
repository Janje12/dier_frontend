import { Component, TemplateRef, ViewChild } from '@angular/core';
import { NbWindowRef, NbWindowService } from '@nebular/theme';

@Component({
  selector: 'footer',
  styleUrls: ['./footer.component.scss'],
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  @ViewChild('contactForm', {read: TemplateRef}) contactFormTemplate: TemplateRef<HTMLElement>;
  private windowRef: NbWindowRef;

  constructor(private windowService: NbWindowService) {
  }

  showContactForm() {
    this.windowRef = this.windowService.open(this.contactFormTemplate,
      {title: 'Prijavite problem!'});
  }

}
