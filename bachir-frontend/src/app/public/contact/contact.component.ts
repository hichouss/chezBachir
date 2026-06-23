import { Component, NgZone } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FooterComponent } from '../../shared/footer/footer.component';

@Component({
  selector: 'app-contact',
  imports: [NavbarComponent, FooterComponent, FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  sent = false;
  sending = false;
  submitted = false;
  formData = { name: '', phone: '', email: '', subject: '', message: '' };

  constructor(private zone: NgZone) {}

  trySubmit(valid: boolean) {
    this.submitted = true;
    if (valid) this.onSubmit();
  }

  onSubmit() {
    const body = new FormData();
    body.append('name', this.formData.name);
    body.append('phone', this.formData.phone);
    body.append('email', this.formData.email);
    body.append('subject', this.formData.subject);
    body.append('message', this.formData.message);
    body.append('_captcha', 'false');
    body.append('_subject', 'Nouveau message - Boucherie Chez Bachir');

    fetch('https://formsubmit.co/ajax/bchezbachir@gmail.com', {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body,
    });

    this.sent = true;
  }
}
