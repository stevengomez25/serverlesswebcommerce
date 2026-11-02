import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { Footer } from './components/footer/footer';
import { CartModalComponent } from './components/cart-modal/cart-modal';
import { CartService } from './services/cart'; // Ajusta la ruta si es necesario
import AOS from 'aos';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Navbar, Footer, CartModalComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class AppComponent implements OnInit {
  
  // Usamos el constructor para inyectar el servicio de forma pública
  constructor(public cartService: CartService) {}

  ngOnInit() {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 50,
    });
  }
}