import { Component, input, output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart';

@Component({
  selector: 'app-cart-modal',
  standalone: true,
  imports: [CommonModule], // <-- Solo CommonModule (CartService se inyecta, no se importa aquí)
  templateUrl: './cart-modal.html',
  styleUrl: './cart-modal.css'
})
export class CartModalComponent {
  // Controla si el modal está abierto o cerrado desde el componente padre
  isOpen = input<boolean>(false);
  closeModal = output<void>();

  cartService = inject(CartService);
  storePhone = '573164187146'; // Número de WhatsApp

  onClose() {
    this.closeModal.emit();
  }

  checkout() {
    this.cartService.checkoutWhatsApp(this.storePhone);
  }
}