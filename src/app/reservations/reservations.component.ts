import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { SidebarComponent } from '../shared/sidebar.component';

type ReservationStatus = 'Confirmada' | 'Alojada' | 'Próxima' | 'Pendente' | 'Concluída' | 'Cancelada';
interface Reservation { initials: string; color: string; name: string; property: string; dates: string; checkIn: string; checkOut: string; guests: string; amount: string; status: ReservationStatus; }

@Component({
  selector: 'app-reservations', standalone: true, imports: [SidebarComponent, FormsModule, RouterLink],
  templateUrl: './reservations.component.html', styleUrl: './reservations.component.css'
})
export class ReservationsComponent {
  searchTerm = '';
  activeFilter: 'Todas' | ReservationStatus = 'Todas';
  activePeriod = 'Este mês';
  readonly periods = ['Este mês', 'Mês passado', 'Próximo mês', 'Todas as datas'];
  profileMenuOpen = false;
  readonly filters: Array<'Todas' | ReservationStatus> = ['Todas', 'Pendente', 'Confirmada', 'Próxima', 'Alojada', 'Concluída', 'Cancelada'];
  readonly reservations: Reservation[] = [
    { initials: 'JM', color: 'bg-[#e5ebdc] text-[#4b654c]', name: 'João Manuel', property: 'Casa do Miradouro', dates: '14 out. – 18 out., 2026', checkIn: '2026-10-14', checkOut: '2026-10-18', guests: '2 hóspedes', amount: 'Kz 248 000', status: 'Confirmada' },
    { initials: 'AM', color: 'bg-[#f3e6da] text-[#965f3c]', name: 'Ana Martins', property: 'Residência Baía Azul', dates: '16 out. – 20 out., 2026', checkIn: '2026-10-16', checkOut: '2026-10-20', guests: '4 hóspedes', amount: 'Kz 420 000', status: 'Alojada' },
    { initials: 'PS', color: 'bg-[#e5e5f1] text-[#5d5b85]', name: 'Pedro Santos', property: 'Casa de Praia do Mussulo', dates: '18 out. – 23 out., 2026', checkIn: '2026-10-18', checkOut: '2026-10-23', guests: '3 hóspedes', amount: 'Kz 675 000', status: 'Próxima' },
    { initials: 'FC', color: 'bg-[#f0e5e9] text-[#90556d]', name: 'Filipa Costa', property: 'Casa do Miradouro', dates: '20 out. – 22 out., 2026', checkIn: '2026-10-20', checkOut: '2026-10-22', guests: '2 hóspedes', amount: 'Kz 124 000', status: 'Confirmada' },
    { initials: 'LC', color: 'bg-[#e2edf0] text-[#477080]', name: 'Luís Carvalho', property: 'Residência Baía Azul', dates: '22 out. – 26 out., 2026', checkIn: '2026-10-22', checkOut: '2026-10-26', guests: '2 hóspedes', amount: 'Kz 420 000', status: 'Pendente' },
    { initials: 'BM', color: 'bg-[#f1e8d9] text-[#886b38]', name: 'Beatriz Miguel', property: 'Casa do Miradouro', dates: '8 out. – 11 out., 2026', checkIn: '2026-10-08', checkOut: '2026-10-11', guests: '3 hóspedes', amount: 'Kz 186 000', status: 'Concluída' },
    { initials: 'FN', color: 'bg-[#e7e2ee] text-[#6b5b83]', name: 'Fátima Nunes', property: 'Casa de Praia do Mussulo', dates: '2 out. – 5 out., 2026', checkIn: '2026-10-02', checkOut: '2026-10-05', guests: '5 hóspedes', amount: 'Kz 450 000', status: 'Cancelada' },
  ];
  constructor(private readonly router: Router) {
    const saved = JSON.parse(localStorage.getItem('sava-reservations') || '[]') as Array<{ property: string; guestName: string; checkIn: string; checkOut: string; guests: number; totalPrice: number; status: string }>;
    const requests = JSON.parse(localStorage.getItem('sava-reservation-requests') || '[]') as Array<{ property: string; guestName: string; checkIn: string; checkOut: string; guests: number; totalPrice: number; status: string }>;
    for (const item of [...requests, ...saved]) {
      const name = item.guestName || 'Hóspede';
      const status = (item.status === 'Confirmada' ? 'Confirmada' : 'Pendente') as ReservationStatus;
      this.reservations.unshift({ initials: name.split(/\s+/).slice(0, 2).map((part) => part[0]).join('').toUpperCase(), color: 'bg-[#e5ebdc] text-[#4b654c]', name, property: item.property, dates: `${this.formatShortDate(item.checkIn)} – ${this.formatShortDate(item.checkOut)}`, checkIn: item.checkIn, checkOut: item.checkOut, guests: `${item.guests} hóspedes`, amount: item.totalPrice ? `Kz ${item.totalPrice.toLocaleString('pt-AO')}` : 'A confirmar', status });
    }
  }
  private formatShortDate(value: string): string {
    return new Date(`${value}T12:00:00`).toLocaleDateString('pt-AO', { day: 'numeric', month: 'short', year: 'numeric' });
  }
  get periodReservations(): Reservation[] {
    if (this.activePeriod === 'Todas as datas') return this.reservations;
    const now = new Date();
    const offset = this.activePeriod === 'Mês passado' ? -1 : this.activePeriod === 'Próximo mês' ? 1 : 0;
    const monthStart = new Date(now.getFullYear(), now.getMonth() + offset, 1);
    const monthEnd = new Date(now.getFullYear(), now.getMonth() + offset + 1, 0);
    const toKey = (date: Date): string => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    const from = toKey(monthStart);
    const to = toKey(monthEnd);
    return this.reservations.filter((item) => item.checkIn <= to && item.checkOut > from);
  }
  get filteredReservations(): Reservation[] {
    const query = this.searchTerm.trim().toLocaleLowerCase('pt-AO');
    return this.periodReservations.filter((item) => (this.activeFilter === 'Todas' || item.status === this.activeFilter) && (!query || `${item.name} ${item.property}`.toLocaleLowerCase('pt-AO').includes(query)));
  }
  get countByStatus(): Record<string, number> { return this.periodReservations.reduce((totals, item) => ({ ...totals, [item.status]: (totals[item.status] || 0) + 1 }), {} as Record<string, number>); }
  statusClass(status: ReservationStatus): string {
    const styles: Record<ReservationStatus, string> = { Confirmada: 'status-confirmed', Alojada: 'status-hosted', Próxima: 'status-upcoming', Pendente: 'status-pending', Concluída: 'status-complete', Cancelada: 'status-cancelled' };
    return styles[status];
  }
  toggleProfileMenu(): void { this.profileMenuOpen = !this.profileMenuOpen; }
  logout(): void { this.router.navigate(['/login']); }
}
