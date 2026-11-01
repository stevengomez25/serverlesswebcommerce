import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contactus.html',
  styleUrl: './contactus.css'
})
export class ContactUs {
  // Reemplaza este número con el de la tienda (incluyendo código de país sin el +)
  targetPhoneNumber: string = '573000000000'; 

  nombre = signal('');
  telefono = signal('');
  correo = signal('');
  mensaje = signal('');

  sendToWhatsApp(event: Event): void {
    event.preventDefault();

    if (!this.nombre() || !this.telefono() || !this.mensaje()) {
      alert('Por favor completa los campos obligatorios (*)');
      return;
    }

    let textMessage = `*Nuevo mensaje desde la Web* 🛍️\n\n`;
    textMessage += `👤 *Nombre:* ${this.nombre()}\n`;
    textMessage += `📞 *Teléfono:* ${this.telefono()}\n`;
    
    if (this.correo().trim() !== '') {
      textMessage += `✉️ *Correo:* ${this.correo()}\n`;
    }
    
    textMessage += `💬 *Mensaje:* ${this.mensaje()}`;

    const encodedText = encodeURIComponent(textMessage);
    const whatsappUrl = `https://wa.me/${this.targetPhoneNumber}?text=${encodedText}`;

    window.open(whatsappUrl, '_blank');
  }
}