import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeroBannerComponent } from './components/hero-banner/hero-banner';
import { Catalog } from './components/catalog/catalog';
import { Navbar } from './components/navbar/navbar';
import { Footer } from './components/footer/footer';
import { MeetUs } from './pages/meet-us/meet-us';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Navbar, HeroBannerComponent, Catalog, Footer, MeetUs],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  @ViewChild(Catalog) Catalog!: Catalog;

  onCategorySelected(categoria: string): void {
    // 1. Cambiamos la pestaña activa en el catálogo
    if (this.Catalog && (categoria === 'Hombre' || categoria === 'Mujer' || categoria === 'Niños')) {
      this.Catalog.cambiarCategoria(categoria);
    }

    // 2. Hacemos el scroll suave hacia el catálogo
    const catalogElement = document.getElementById('catalogo');
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: 'smooth' });
    }
  }
}