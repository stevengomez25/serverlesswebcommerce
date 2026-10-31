import { Component, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero-banner.html',
  styleUrl: './hero-banner.css'
})
export class HeroBannerComponent {
  // Emite la categoría seleccionada al componente padre para hacer scroll o filtrar
  seleccionarCategoria = output<string>();

  onSelectCategory(categoria: string): void {
    this.seleccionarCategoria.emit(categoria);
  }
}