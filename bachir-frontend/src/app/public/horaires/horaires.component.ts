import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FooterComponent } from '../../shared/footer/footer.component';

@Component({
  selector: 'app-horaires',
  imports: [NavbarComponent, FooterComponent, RouterLink],
  templateUrl: './horaires.component.html',
  styleUrl: './horaires.component.scss'
})
export class HorairesComponent {}
