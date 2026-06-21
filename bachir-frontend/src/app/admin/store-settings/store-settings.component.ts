import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoreService } from '../../services/store.service';
import { StoreInfo } from '../../models/models';

@Component({
  selector: 'app-store-settings',
  imports: [FormsModule],
  templateUrl: './store-settings.component.html',
  styleUrl: './store-settings.component.scss'
})
export class StoreSettingsComponent implements OnInit {
  private storeService = inject(StoreService);

  info: StoreInfo = { name: '' };
  success = '';
  error = '';

  ngOnInit() {
    this.storeService.get().subscribe(s => this.info = { ...s });
  }

  save() {
    this.error = '';
    this.storeService.update(this.info).subscribe({
      next: (s) => {
        this.info = { ...s };
        this.success = 'Informations sauvegardées avec succès.';
        setTimeout(() => this.success = '', 3000);
      },
      error: (e) => this.error = e.error?.error || 'Erreur lors de la sauvegarde.'
    });
  }
}
