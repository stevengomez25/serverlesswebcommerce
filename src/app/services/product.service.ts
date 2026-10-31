import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

export interface Product {
  categoria: 'Hombre' | 'Mujer' | 'Niños';
  subcategoria: string;
  title: string;
  slug: string;
  codigo: string;
  precio: number;
  stock: number;
  colores: string[];
  tallas: string[];
  image: string;
  description: string;
  body: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);

  // Simulación de carga de productos estáticos generados por Decap CMS
  // En producción estática real, esto puede leer un archivo index.json con la lista de productos
  obtenerProductos(): Observable<Product[]> {
    // Aquí puedes enlazar tu endpoint de productos o archivo índice
    return this.http.get<Product[]>('/assets/data/productos-index.json');
  }
}