import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroBannerComponent } from '../../components/hero-banner/hero-banner';
import { Catalog } from '../../components/catalog/catalog';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeroBannerComponent, Catalog],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  @ViewChild(Catalog) catalogComponent!: Catalog;

  onCategorySelected(categoria: string): void {
    // 1. Cambiamos la pestaña activa en el catálogo
    if (this.catalogComponent && (categoria === 'Hombre' || categoria === 'Mujer' || categoria === 'Niños')) {
      this.catalogComponent.cambiarCategoria(categoria);
    }

    // 2. Hacemos el scroll suave hacia la sección del catálogo
    const catalogElement = document.getElementById('catalogo');
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: 'smooth' });
    }
  }
}