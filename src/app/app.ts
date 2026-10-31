import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeroBannerComponent } from './components/hero-banner/hero-banner';
import { Catalog } from './components/catalog/catalog';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeroBannerComponent, Catalog],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  onCategorySelected(categoria: string): void {
    const catalogElement = document.getElementById('catalogo');
    if(catalogElement){
      catalogElement.scrollIntoView({behavior:'smooth'});
    }
    // Próximamente: Hacer scroll automático hacia la galería correspondiente
  }
}