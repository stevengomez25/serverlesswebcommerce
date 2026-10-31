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
    this.http.get<any>('/assets/data/productos.json').subscribe({
      next: (data) => {
        console.log('Datos cargados del JSON:', data); // Mira esto en la consola
        
        if (Array.isArray(data)) {
          this.productos.set(data); // Si el JSON es un array directo [...]
        } else if (data && Array.isArray(data.items)) {
          this.productos.set(data.items); // Si el JSON es un objeto { items: [...] }
        }
      },
      error: (err) => {
        console.error('Error al cargar productos.json:', err);
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