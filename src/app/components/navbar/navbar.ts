import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  isCartOpen = signal(false);
  cartService = inject(CartService);

  openCart() {
    this.isCartOpen.set(true);
  }

  closeCart() {
    this.isCartOpen.set(false);
  }
  // Control de visibilidad del minimodal "¿Qué ofrecemos?" en desktop y mobile
  isDropdownOpen = signal<boolean>(false);
  // Control del menú hamburguesa para dispositivos móviles
  isMobileMenuOpen = signal<boolean>(false);

  // Categoría activa dentro del Mega Menú para mostrar sus subcategorías en hover/clic
  categoriaHover = signal<'Hombre' | 'Mujer' | 'Niños'>('Hombre');

  subcategoriasPorCategoria = {
    Hombre: [
      'Camisas y Camisetas',
      'Pantalones y Jeans',
      'Busos y Chaquetas',
      'Zapatos',
      'Ropa Interior y Boxers',
      'Accesorios',
    ],
    Mujer: [
      'Camisas y Camisetas',
      'Pantalones y Jeans',
      'Busos y Chaquetas',
      'Blusas',
      'Zapatos',
      'Accesorios',
    ],
    Niños: [
      'Camisas y Camisetas',
      'Pantalones y Jeans',
      'Busos y Chaquetas',
      'Zapatos',
      'Accesorios',
    ],
  };

  toggleDropdown() {
    this.isDropdownOpen.update((v) => !v);
  }

  closeDropdown() {
    this.isDropdownOpen.set(false);
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen.update((v) => !v);
  }

  setHoverCategory(cat: 'Hombre' | 'Mujer' | 'Niños') {
    this.categoriaHover.set(cat);
  }
}
