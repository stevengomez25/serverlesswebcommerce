import { Injectable, signal, computed } from '@angular/core';

export interface CartItem {
  id: string;
  nombre: string;
  precio: number;
  cantidad: number;
  talla?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // Estado privado con Signals
  private cartItems = signal<CartItem[]>([]);

  // Exposición pública de lectura
  items = this.cartItems.asReadonly();

  // Computados automáticos para totales y cantidad de productos
  // Totales computados seguros
  totalPrice = computed(() => {
    const items = this.cartItems();
    return items.reduce((acc, item) => acc + (Number(item.precio) * Number(item.cantidad)), 0);
  });

  totalItems = computed(() => {
    const items = this.cartItems();
    return items.reduce((acc, item) => acc + Number(item.cantidad), 0);
  });

  // Agregar producto al carrito
  addToCart(product: CartItem) {
    this.cartItems.update(items => {
      const existingIndex = items.findIndex(i => i.id === product.id && i.talla === product.talla);
      if (existingIndex > -1) {
        const updated = [...items];
        updated[existingIndex].cantidad += product.cantidad;
        return updated;
      }
      return [...items, product];
    });
  }

  // Remover un producto específico
  removeFromCart(id: string, talla?: string) {
    this.cartItems.update(items => items.filter(i => !(i.id === id && i.talla === talla)));
  }

  // Vaciar carrito
  clearCart() {
    this.cartItems.set([]);
  }

  // Generar y enviar el mensaje completo a WhatsApp
  checkoutWhatsApp(targetPhoneNumber: string) {
    const items = this.cartItems();
    if (items.length === 0) return;

    let message = `🛍️ *¡Nuevo Pedido desde la Web!*\n\n`;

    items.forEach((item, index) => {
      message += `${index + 1}. *${item.nombre}*\n`;
      if (item.talla) message += `   ▫️ Talla: ${item.talla}\n`;
      message += `   ▫️ Cantidad: ${item.cantidad}\n`;
      message += `   ▫️ Subtotal: $${item.precio * item.cantidad}\n\n`;
    });

    message += `--------------------\n`;
    message += `💰 *Total a Pagar:* $${this.totalPrice()}\n\n`;
    message += `Por favor confirmen la disponibilidad y el método de pago. ¡Gracias!`;

    const encodedText = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${targetPhoneNumber}?text=${encodedText}`;

    window.open(whatsappUrl, '_blank');
  }

  isCartOpen = signal(false);

  openCart() {
    this.isCartOpen.set(true);
  }

  closeCart() {
    this.isCartOpen.set(false);
  }
}