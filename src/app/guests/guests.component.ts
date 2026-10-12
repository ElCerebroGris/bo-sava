import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../shared/sidebar.component';
import { ProfileMenuComponent } from '../shared/profile-menu.component';

interface Guest { name: string; contact: string; reservations: number; lastStay: string; initials: string; }

@Component({ selector: 'app-guests', standalone: true, imports: [SidebarComponent, ProfileMenuComponent, FormsModule], templateUrl: './guests.component.html', styleUrl: './guests.component.css' })
export class GuestsComponent {
  searchTerm = '';
  readonly guests: Guest[] = [
    { name: 'João Manuel', contact: 'joao.manuel@email.com', reservations: 3, lastStay: '14 out. 2026', initials: 'JM' },
    { name: 'Ana Martins', contact: '+244 923 456 789', reservations: 2, lastStay: '16 out. 2026', initials: 'AM' },
    { name: 'Pedro Santos', contact: 'pedro.santos@email.com', reservations: 1, lastStay: '18 out. 2026', initials: 'PS' },
    { name: 'Filipa Costa', contact: '+244 934 567 890', reservations: 2, lastStay: '20 out. 2026', initials: 'FC' },
    { name: 'Luís Carvalho', contact: 'luis.carvalho@email.com', reservations: 1, lastStay: '22 out. 2026', initials: 'LC' },
  ];
  constructor() {
    const bookings = [
      ...JSON.parse(localStorage.getItem('sava-reservations') || '[]') as Array<{ guestName?: string; guestContact?: string; checkIn?: string }>,
      ...JSON.parse(localStorage.getItem('sava-reservation-requests') || '[]') as Array<{ guestName?: string; guestContact?: string; checkIn?: string }>,
    ];
    for (const booking of bookings) {
      const name = booking.guestName?.trim();
      if (!name) continue;
      const existing = this.guests.find((guest) => guest.name.toLocaleLowerCase('pt-AO') === name.toLocaleLowerCase('pt-AO'));
      if (existing) { existing.reservations++; continue; }
      this.guests.unshift({ name, contact: booking.guestContact || 'Contacto não indicado', reservations: 1, lastStay: booking.checkIn ? new Date(`${booking.checkIn}T12:00:00`).toLocaleDateString('pt-AO') : 'Por confirmar', initials: name.split(/\s+/).slice(0, 2).map((part) => part[0]).join('').toUpperCase() });
    }
  }
  get filteredGuests(): Guest[] {
    const query = this.searchTerm.trim().toLocaleLowerCase('pt-AO');
    return this.guests.filter((guest) => !query || `${guest.name} ${guest.contact}`.toLocaleLowerCase('pt-AO').includes(query));
  }
}
