import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Articulo {
  title: string;
  slug: string;
  date: string;
  description: string;
  image?: string;
  body: string;
}

@Injectable({
  providedIn: 'root'
})
export class ArticulosService {
  private http = inject(HttpClient);

  // Usamos Signals de Angular para máxima reactividad y estabilidad futura
  articulos = signal<Articulo[]>([]);

  // En producción estática, podemos cargar un índice de artículos o leer directamente el JSON
  obtenerArticuloPorSlug(slug: string): Observable<Articulo> {
    return this.http.get<Articulo>(`/assets/data/articulos/${slug}.json`);
  }
}