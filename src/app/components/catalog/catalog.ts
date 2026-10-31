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
  
  // Array dinámico alimentado desde la carpeta de assets
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

  // Carga todos los archivos JSON guardados por Decap CMS en src/assets/data/productos/
  private cargarProductosDesdeAdmin(): void {
    const jsonFiles = (import.meta as ImportMeta & {
      glob: (pattern: string, options: { eager: true }) => Record<string, unknown>;
    }).glob('/src/assets/data/productos/*.json', { eager: true });
    
    const listaProductos: Producto[] = Object.values(jsonFiles).map((fileContent: any) => {
      return fileContent.default || fileContent;
    });

    this.productos.set(listaProductos);
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