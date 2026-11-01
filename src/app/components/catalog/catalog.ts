import { Component, signal, computed, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { CartService } from '../../services/cart';
import { FormsModule } from '@angular/forms';

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
  imports: [CommonModule, FormsModule],
  templateUrl: './catalog.html',
  styleUrl: './catalog.css'
})
export class Catalog implements OnInit {
  private http = inject(HttpClient);
  cartService = inject(CartService);

  categoriaActiva = signal<'Hombre' | 'Mujer' | 'Niños'>('Hombre');
  subcategoriaActiva = signal<string>('Todos');
  productos = signal<Producto[]>([]);

  subcategoriasDisponibles = [
    'Todos', 'Camisas y Camisetas', 'Pantalones y Jeans', 
    'Busos y Chaquetas', 'Blusas', 'Zapatos', 
    'Ropa Interior y Boxers', 'Medias', 'Accesorios'
  ];

  // Estado para la lógica de agregar al carrito por producto
  productoConfigurandoId = signal<string | null>(null);
  tallaSeleccionada = signal<string>('');
  colorSeleccionado = signal<string>('');
  cantidadSeleccionada = signal<number>(1);

  productoDetalle = signal<Producto | null>(null);

  ngOnInit(): void {
    this.cargarProductos();
  }

  private cargarProductos(): void {
    this.http.get<any>('/assets/data/productos.json').subscribe({
      next: (data) => {
        console.log('Datos cargados:', data);
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
    this.productoConfigurandoId.set(null);
  }

  filtrarSubcategoria(sub: string) {
    this.subcategoriaActiva.set(sub);
    this.productoConfigurandoId.set(null);
  }
  // Lógica del Modal de Detalles
  abrirDetalle(prod: Producto) {
    this.productoDetalle.set(prod);
  }

  cerrarDetalle() {
    this.productoDetalle.set(null);
  }
  
  // Lógica para el carrito
  iniciarSeleccion(prod: Producto) {
    this.productoConfigurandoId.set(prod.codigo);
    this.tallaSeleccionada.set(prod.tallas?.[0] || 'Única');
    this.colorSeleccionado.set(prod.colores?.[0] || 'Único');
    this.cantidadSeleccionada.set(1);
  }

  cancelarSeleccion() {
    this.productoConfigurandoId.set(null);
  }

  seleccionarTalla(talla: string) {
    this.tallaSeleccionada.set(talla);
  }

  seleccionarColor(color: string) {
    this.colorSeleccionado.set(color);
  }

  cambiarCantidad(delta: number) {
    const nuevaCant = this.cantidadSeleccionada() + delta;
    if (nuevaCant >= 1) {
      this.cantidadSeleccionada.set(nuevaCant);
    }
  }

  confirmarAgregar(prod: Producto) {
    this.cartService.addToCart({
      id: prod.codigo,
      nombre: prod.title,
      precio: prod.precio,
      cantidad: this.cantidadSeleccionada(),
      talla: `${this.tallaSeleccionada()} / Color: ${this.colorSeleccionado()}`
    });
    this.productoConfigurandoId.set(null);
  }
}