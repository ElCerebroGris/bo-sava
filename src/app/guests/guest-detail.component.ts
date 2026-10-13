import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SidebarComponent } from '../shared/sidebar.component';
import { ProfileMenuComponent } from '../shared/profile-menu.component';

interface GuestBooking { property: string; checkIn: string; checkOut: string; guests: number; totalPrice: number; status: string; }
interface StoredBooking extends GuestBooking { guestName?: string; guestContact?: string; }

@Component({
  selector: 'app-guest-detail',
  standalone: true,
  imports: [SidebarComponent, ProfileMenuComponent, RouterLink],
  templateUrl: './guest-detail.component.html',
  styleUrl: './guest-detail.component.css',
})
export class GuestDetailComponent {
  readonly id: string;
  readonly samples = [
    { id: 'joao-manuel', name: 'João Manuel', contact: 'joao.manuel@email.com' },
    { id: 'ana-martins', name: 'Ana Martins', contact: '+244 923 456 789' },
    { id: 'pedro-santos', name: 'Pedro Santos', contact: 'pedro.santos@email.com' },
    { id: 'filipa-costa', name: 'Filipa Costa', contact: '+244 934 567 890' },
    { id: 'luis-carvalho', name: 'Luís Carvalho', contact: 'luis.carvalho@email.com' },
  ];
  readonly guest?: { id: string; name: string; contact: string };
  readonly bookings: GuestBooking[];

  constructor(route: ActivatedRoute) {
    this.id = route.snapshot.paramMap.get('id') || '';
    const all = [
      ...JSON.parse(localStorage.getItem('sava-reservations') || '[]') as StoredBooking[],
      ...JSON.parse(localStorage.getItem('sava-reservation-requests') || '[]') as StoredBooking[],
    ];
    const matching = all.filter((booking) => this.guestId(booking.guestName || '') === this.id);
    const sample = this.samples.find((item) => item.id === this.id);
    this.guest = matching.length
      ? { id: this.id, name: matching[0].guestName || 'Hóspede', contact: matching[0].guestContact || 'Contacto não indicado' }
      : sample;
    this.bookings = matching.map(({ property, checkIn, checkOut, guests, totalPrice, status }) => ({ property, checkIn, checkOut, guests, totalPrice, status }));
  }

  get initials(): string {
    return (this.guest?.name || '').split(/\s+/).slice(0, 2).map((part) => part[0]).join('').toUpperCase();
  }

  formatDate(value: string): string {
    return new Date(`${value}T12:00:00`).toLocaleDateString('pt-AO', { day: 'numeric', month: 'short', year: 'numeric' });
  }

  formatPrice(value: number): string { return value ? `Kz ${value.toLocaleString('pt-AO')}` : 'A confirmar'; }

  private guestId(name: string): string {
    return name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  }
}
