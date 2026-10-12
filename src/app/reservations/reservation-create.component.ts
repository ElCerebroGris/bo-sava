import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { SidebarComponent } from '../shared/sidebar.component';

type Channel = 'presencial' | 'whatsapp' | 'email';

@Component({
  selector: 'app-reservation-create', standalone: true,
  imports: [SidebarComponent, FormsModule, RouterLink],
  templateUrl: './reservation-create.component.html', styleUrl: './reservation-create.component.css'
})
export class ReservationCreateComponent {
  channel: Channel = 'presencial';
  property = 'Casa do Miradouro';
  guestName = '';
  guestContact = '';
  checkIn = '';
  checkOut = '';
  guests = 1;
  paymentMethod: 'Multicaixa Express' | 'Referência Multicaixa' = 'Multicaixa Express';
  invoice = false;
  shareUrl = '';
  error = '';
  copied = false;
  saved = false;

  constructor(private readonly router: Router) {}
  get isOnline(): boolean { return this.channel !== 'presencial'; }
  get nightlyRate(): number {
    const rates: Record<string, number> = { 'Casa do Miradouro': 62000, 'Residência Baía Azul': 105000, 'Casa de Praia do Mussulo': 150000 };
    return rates[this.property] || 0;
  }
  get nights(): number {
    if (!this.checkIn || !this.checkOut || this.checkOut <= this.checkIn) return 0;
    return Math.round((new Date(`${this.checkOut}T12:00:00`).getTime() - new Date(`${this.checkIn}T12:00:00`).getTime()) / 86400000);
  }
  get totalPrice(): number { return this.nightlyRate * this.nights; }
  formatPrice(value: number): string { return `Kz ${value.toLocaleString('pt-AO')}`; }
  async create(): Promise<void> {
    this.error = '';
    if (!this.checkIn || !this.checkOut || this.checkOut <= this.checkIn) { this.error = 'Indique datas válidas para a entrada e saída.'; return; }
    if (!this.isOnline && (!this.guestName.trim() || !this.guestContact.trim())) { this.error = 'Preencha o nome e o contacto do hóspede presencial.'; return; }
    const reservation = { id: crypto.randomUUID(), property: this.property, guestName: this.guestName.trim(), guestContact: this.guestContact.trim(), checkIn: this.checkIn, checkOut: this.checkOut, guests: this.guests, nightlyRate: this.nightlyRate, totalPrice: this.totalPrice, paymentMethod: this.paymentMethod, invoice: this.invoice, channel: this.channel, status: this.isOnline ? 'Link enviado' : 'Confirmada', createdAt: new Date().toISOString() };
    if (!this.isOnline) {
      const current = JSON.parse(localStorage.getItem('sava-reservations') || '[]') as unknown[];
      current.unshift(reservation);
      localStorage.setItem('sava-reservations', JSON.stringify(current));
      this.saved = true;
      return;
    }
    const requests = JSON.parse(localStorage.getItem('sava-booking-links') || '[]') as Array<Record<string, unknown>>;
    requests.unshift(reservation);
    localStorage.setItem('sava-booking-links', JSON.stringify(requests));
    const payload = JSON.stringify({ id: reservation.id, property: reservation.property, checkIn: reservation.checkIn, checkOut: reservation.checkOut, guests: reservation.guests, nightlyRate: reservation.nightlyRate, totalPrice: reservation.totalPrice, paymentOptions: ['Multicaixa Express', 'Referência Multicaixa'] });
    const bytes = new TextEncoder().encode(payload);
    const token = btoa(Array.from(bytes, (byte) => String.fromCharCode(byte)).join('')).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
    this.shareUrl = `${window.location.origin}/booking/request/${token}`;
  }
  async copyLink(): Promise<void> {
    if (!this.shareUrl) return;
    try { await navigator.clipboard.writeText(this.shareUrl); this.copied = true; }
    catch { this.error = 'Não foi possível copiar automaticamente. Seleccione e copie o link.'; }
  }
  openChannel(): void {
    if (!this.shareUrl) return;
    const text = encodeURIComponent(`Olá! Faça o seu pedido de reserva aqui: ${this.shareUrl}`);
    const target = this.channel === 'whatsapp' ? `https://wa.me/?text=${text}` : `mailto:${encodeURIComponent(this.guestContact)}?subject=Pedido%20de%20reserva&body=${text}`;
    window.open(target, '_blank', 'noopener');
  }
}
