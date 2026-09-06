import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FooterComponent } from '../../shared/footer/footer.component';

@Component({
  selector: 'app-makanek',
  imports: [NavbarComponent, FooterComponent, RouterLink],
  templateUrl: './makanek.component.html',
  styleUrl: './makanek.component.scss'
})
export class MakanekComponent {}
