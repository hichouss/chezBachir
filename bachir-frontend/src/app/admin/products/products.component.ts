import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { Product, Category } from '../../models/models';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-products',
  imports: [FormsModule, DecimalPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);

  products: Product[] = [];
  categories: Category[] = [];
  showForm = false;
  editing: Partial<Product> = {};
  isEdit = false;
  error = '';
  success = '';

  ngOnInit() {
    this.load();
    this.categoryService.getAll().subscribe(c => this.categories = c);
  }

  load() {
    this.productService.getAll().subscribe(p => this.products = p);
  }

  openCreate() {
    this.editing = { available: true, isPromotion: false, unit: 'kg' };
    this.isEdit = false;
    this.showForm = true;
    this.error = '';
  }

  openEdit(p: Product) {
    this.editing = { ...p };
    this.isEdit = true;
    this.showForm = true;
    this.error = '';
  }

  save() {
    const obs = this.isEdit
      ? this.productService.update(this.editing.id!, this.editing)
      : this.productService.create(this.editing);

    obs.subscribe({
      next: () => { this.showForm = false; this.load(); this.flashSuccess(); },
      error: (e) => this.error = e.error?.error || 'Erreur lors de la sauvegarde'
    });
  }

  delete(id: number) {
    if (!confirm('Supprimer ce produit ?')) return;
    this.productService.delete(id).subscribe(() => this.load());
  }

  private flashSuccess() {
    this.success = this.isEdit ? 'Produit modifié.' : 'Produit créé.';
    setTimeout(() => this.success = '', 3000);
  }
}
