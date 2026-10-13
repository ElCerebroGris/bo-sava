import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SidebarComponent } from '../shared/sidebar.component';

interface ReservationDetail {
  id: string;
  property: string;
  guestName: string;
  guestContact?: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  paymentMethod?: string;
  status: string;
}

@Component({
  selector: 'app-reservation-detail',
  standalone: true,
  imports: [SidebarComponent, RouterLink],
  templateUrl: './reservation-detail.component.html',
  styleUrl: './reservation-detail.component.css',
})
export class ReservationDetailComponent {
  reservation?: ReservationDetail;
  notice = '';

  private readonly samples: ReservationDetail[] = [
    { id: '2026-10-14', property: 'Casa do Miradouro', guestName: 'João Manuel', guestContact: '+244 923 456 789', checkIn: '2026-10-14', checkOut: '2026-10-18', guests: 2, totalPrice: 248000, paymentMethod: 'Multicaixa Express', status: 'Confirmada' },
    { id: '2026-10-16', property: 'Residência Baía Azul', guestName: 'Ana Martins', guestContact: 'ana.martins@email.com', checkIn: '2026-10-16', checkOut: '2026-10-20', guests: 4, totalPrice: 420000, paymentMethod: 'Referência Multicaixa', status: 'Alojada' },
    { id: '2026-10-18', property: 'Casa de Praia do Mussulo', guestName: 'Pedro Santos', guestContact: '+244 923 111 222', checkIn: '2026-10-18', checkOut: '2026-10-23', guests: 3, totalPrice: 675000, paymentMethod: 'Multicaixa Express', status: 'Próxima' },
    { id: '2026-10-20', property: 'Casa do Miradouro', guestName: 'Filipa Costa', guestContact: '+244 923 333 444', checkIn: '2026-10-20', checkOut: '2026-10-22', guests: 2, totalPrice: 124000, paymentMethod: 'Multicaixa Express', status: 'Confirmada' },
    { id: '2026-10-22', property: 'Residência Baía Azul', guestName: 'Luís Carvalho', guestContact: '+244 923 555 666', checkIn: '2026-10-22', checkOut: '2026-10-26', guests: 2, totalPrice: 420000, paymentMethod: 'Pendente', status: 'Pendente' },
    { id: '2026-10-08', property: 'Casa do Miradouro', guestName: 'Beatriz Miguel', checkIn: '2026-10-08', checkOut: '2026-10-11', guests: 3, totalPrice: 186000, status: 'Concluída' },
    { id: '2026-10-02', property: 'Casa de Praia do Mussulo', guestName: 'Fátima Nunes', checkIn: '2026-10-02', checkOut: '2026-10-05', guests: 5, totalPrice: 450000, status: 'Cancelada' },
  ];

  constructor(private readonly route: ActivatedRoute, private readonly router: Router) {
    const id = this.route.snapshot.paramMap.get('id') || '';
    const saved = this.readSaved();
    this.reservation = saved.find((item) => item.id === id || item.checkIn === id)
      || this.samples.find((item) => item.id === id);
  }

  get nights(): number {
    if (!this.reservation) return 0;
    return Math.round((new Date(`${this.reservation.checkOut}T12:00:00`).getTime() - new Date(`${this.reservation.checkIn}T12:00:00`).getTime()) / 86400000);
  }

  get guestInitials(): string {
    return (this.reservation?.guestName || '').split(/\s+/).slice(0, 2).map((part) => part[0]).join('').toUpperCase();
  }

  formatDate(value: string): string {
    return new Date(`${value}T12:00:00`).toLocaleDateString('pt-AO', { day: 'numeric', month: 'long', year: 'numeric' });
  }

  formatPrice(value: number): string { return `Kz ${value.toLocaleString('pt-AO')}`; }

  setStatus(status: string): void {
    if (!this.reservation) return;
    this.reservation.status = status;
    const stored = this.readSaved();
    const index = stored.findIndex((item) => item.id === this.reservation?.id || item.checkIn === this.reservation?.checkIn);
    if (index >= 0) {
      stored[index] = { ...stored[index], status };
      localStorage.setItem('sava-reservations', JSON.stringify(stored));
    }
    this.notice = `Reserva ${status.toLocaleLowerCase('pt-AO')}.`;
  }

  goBack(): void { this.router.navigate(['/reservations']); }

  private readSaved(): ReservationDetail[] {
    return JSON.parse(localStorage.getItem('sava-reservations') || '[]') as ReservationDetail[];
  }
}
