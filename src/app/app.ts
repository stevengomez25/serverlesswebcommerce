import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { Footer } from './components/footer/footer';
import { CartModalComponent } from './components/cart-modal/cart-modal';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Navbar, Footer, CartModalComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  // AppComponent solo se encarga del shell global (Navbar + Router + Footer)
}