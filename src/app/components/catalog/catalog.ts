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
  body?: string;
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
    'Todos', 'Camisas y Camisetas', 'Pantalones y Jeans', 
    'Busos y Chaquetas', 'Blusas', 'Zapatos', 
    'Ropa Interior y Boxers', 'Medias', 'Accesorios'
  ];

  ngOnInit(): void {
    this.cargarProductos();
  }

  private cargarProductos(): void {
    // Usamos la ruta pública correcta y tipamos como 'any' o un objeto con items
    this.http.get<any>('/assets/data/productos.json').subscribe({
      next: (data) => {
        console.log('Datos cargados:', data); // Útil para verificar en la consola (F12)
        
        // Soportamos ambos formatos por seguridad (objeto con items o array plano)
        if (data && Array.isArray(data.items)) {
          this.productos.set(data.items);
        } else if (Array.isArray(data)) {
          this.productos.set(data);
        }
      },
      error: (err) => {
        console.error('Error al cargar el JSON de productos:', err);
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