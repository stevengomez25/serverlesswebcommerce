import { Component, signal, computed, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

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
  body: string;
}

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './catalog.html',
  styleUrl: './catalog.css'
})
export class Catalog implements OnInit {
  private http = inject(HttpClient);

  categoriaActiva = signal<'Hombre' | 'Mujer' | 'Niños'>('Hombre');
  subcategoriaActiva = signal<string>('Todos');
  
  productos = signal<Producto[]>([]);

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

  ngOnInit(): void {
    this.cargarProductosDesdeAdmin();
  }

  // Carga el archivo JSON centralizado de productos de forma segura mediante HTTP estático
  private cargarProductosDesdeAdmin(): void {
    // Apuntamos al archivo JSON índice donde se almacenan los productos
    this.http.get<{ items: Producto[] }>('/assets/data/productos.json').subscribe({
      next: (data) => {
        if (data && Array.isArray(data.items)) {
          this.productos.set(data.items);
        }
      },
      error: (err) => {
        console.log('Aún no hay archivo de productos o está vacio, cargando array vacío.', err);
        this.productos.set([]);
      }
    });
  }

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