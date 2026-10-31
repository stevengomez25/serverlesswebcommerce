import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

// Importación directa del JSON estático (Angular lo embebe en el bundle sin fallos de red)
import productosData from '../../../assets/data/productos.json';

export interface Producto {
  title: string;
  slug: string;
  codigo: string;
  precio: number;
  stock: number;
  categoria: 'Hombre' | 'Mujer' | 'Niños';
  subcategoria: string;
  colores: string[];
  tallas: string[];
  image: string;
  description: string;
  body?: string;
}

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './catalog.html',
  styleUrl: './catalog.css'
})
export class Catalog {
  categoriaActiva = signal<'Hombre' | 'Mujer' | 'Niños'>('Hombre');
  subcategoriaActiva = signal<string>('Todos');
  
  // Cargamos los datos directamente desde el JSON importado de forma síncrona
  productos = signal<Producto[]>(
    Array.isArray(productosData) ? (productosData as Producto[]) : ((productosData as any).items || [])
  );

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
    this.subcategoriaActiva.set('Todos');
  }

  filtrarSubcategoria(sub: string) {
    this.subcategoriaActiva.set(sub);
  }
}