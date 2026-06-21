import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Category } from '../../models/models';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-categories',
  imports: [FormsModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {
  private categoryService = inject(CategoryService);

  categories: Category[] = [];
  showForm = false;
  editing: Partial<Category> = {};
  isEdit = false;
  error = '';
  success = '';

  ngOnInit() { this.load(); }

  load() {
    this.categoryService.getAll().subscribe(c => this.categories = c);
  }

  openCreate() {
    this.editing = { active: true, displayOrder: 0 };
    this.isEdit = false;
    this.showForm = true;
    this.error = '';
  }

  openEdit(c: Category) {
    this.editing = { ...c };
    this.isEdit = true;
    this.showForm = true;
    this.error = '';
  }

  save() {
    const obs = this.isEdit
      ? this.categoryService.update(this.editing.id!, this.editing)
      : this.categoryService.create(this.editing);

    obs.subscribe({
      next: () => { this.showForm = false; this.load(); this.flashSuccess(); },
      error: (e) => this.error = e.error?.error || 'Erreur lors de la sauvegarde'
    });
  }

  delete(id: number) {
    if (!confirm('Supprimer cette catégorie ?')) return;
    this.categoryService.delete(id).subscribe({ next: () => this.load(), error: (e) => alert(e.error?.error) });
  }

  private flashSuccess() {
    this.success = this.isEdit ? 'Catégorie modifiée.' : 'Catégorie créée.';
    setTimeout(() => this.success = '', 3000);
  }
}
