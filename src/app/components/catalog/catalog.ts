import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface ProductoMock {
  id: string;
  categoria: 'Hombre' | 'Mujer' | 'Niños';
  subcategoria: string;
  title: string;
  precio: number;
  image: string;
  tallas: string[];
  colores: string[];
}

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './catalog.html',
  styleUrl: './catalog.css'
})
export class Catalog {
  // Estado reactivo con Signals
  categoriaActiva = signal<'Hombre' | 'Mujer' | 'Niños'>('Hombre');
  subcategoriaActiva = signal<string>('Todos');

  // Subcategorías disponibles por tipo de prenda
  subcategoriasDisponibles = [
    'Todos',
    'Camisas y Camisetas',
    'Pantalones y Jeans',
    'Busos y Chaquetas',
    'Blusas',
    'Zapatos',
    'Ropa Interior y Boxers',
    'Medias',
    'Accesorios'
  ];

  // Mock de productos de prueba para ver el diseño funcionando al instante
  productos = signal<ProductoMock[]>([
    { id: '1', categoria: 'Hombre', subcategoria: 'Camisas y Camisetas', title: 'Camiseta Oversize Urbana', precio: 45000, image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80', tallas: ['S', 'M', 'L'], colores: ['Negro', 'Blanco'] },
    { id: '2', categoria: 'Hombre', subcategoria: 'Pantalones y Jeans', title: 'Jeans Slim Fit Classic', precio: 110000, image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=600&q=80', tallas: ['30', '32', '34'], colores: ['Azul Oscuro'] },
    { id: '3', categoria: 'Mujer', subcategoria: 'Blusas', title: 'Blusa Elegante Minimalista', precio: 65000, image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80', tallas: ['XS', 'S', 'M'], colores: ['Blanco', 'Beige'] },
    { id: '4', categoria: 'Niños', subcategoria: 'Camisas y Camisetas', title: 'Set Camiseta y Bermuda Infantil', precio: 55000, image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=600&q=80', tallas: ['4', '6', '8'], colores: ['Rojo', 'Azul'] }
  ]);

  // Productos filtrados automáticamente según la categoría y subcategoria seleccionada
  productosFiltrados = computed(() => {
    const cat = this.categoriaActiva();
    const subcat = this.subcategoriaActiva();

    return this.productos().filter(p => {
      const matchCat = p.categoria === cat;
      const matchSubcat = subcat === 'Todos' || p.subcategoria === subcat;
      return matchCat && matchSubcat;
    });
  });

  cambiarCategoria(cat: 'Hombre' | 'Mujer' | 'Niños') {
    this.categoriaActiva.set(cat);
    this.subcategoriaActiva.set('Todos'); // Resetea el filtro de arriba al cambiar de sección
  }

  filtrarSubcategoria(sub: string) {
    this.subcategoriaActiva.set(sub);
  }
}