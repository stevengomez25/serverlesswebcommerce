import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { Footer } from './components/footer/footer';
import { CartModalComponent } from './components/cart-modal/cart-modal';
import AOS from 'aos';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Navbar, Footer, CartModalComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class AppComponent implements OnInit {
  ngOnInit() {
    AOS.init({
      duration: 800, // Duración de la animación en ms (suave y elegante)
      easing: 'ease-out-cubic', // Curva de aceleración profesional
      once: true, // Se anima solo la primera vez que haces scroll para no marear
      offset: 50, // Margen de activación
    });
  }
  // AppComponent solo se encarga del shell global (Navbar + Router + Footer)
}
