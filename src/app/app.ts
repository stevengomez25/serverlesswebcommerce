import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeroBannerComponent } from './components/hero-banner/hero-banner';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeroBannerComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  onCategorySelected(categoria: string): void {
    console.log('Categoría seleccionada:', categoria);
    // Próximamente: Hacer scroll automático hacia la galería correspondiente
  }
}