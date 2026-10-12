import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

interface BookingLink { id: string; property: string; checkIn: string; checkOut: string; guests: number; paymentMethod: string; invoice: boolean; channel: string; }

@Component({
  selector: 'app-booking-request', standalone: true, imports: [FormsModule],
  templateUrl: './booking-request.component.html', styleUrl: './booking-request.component.css'
})
export class BookingRequestComponent {
  readonly link: BookingLink | undefined;
  guestName = '';
  guestContact = '';
  sent = false;
  constructor(route: ActivatedRoute) {
    const token = route.snapshot.paramMap.get('token');
    let decoded: BookingLink | undefined;
    if (token) {
      try {
        const base64 = token.replace(/-/g, '+').replace(/_/g, '/');
        const binary = atob(base64.padEnd(Math.ceil(base64.length / 4) * 4, '='));
        const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0));
        decoded = JSON.parse(new TextDecoder().decode(bytes)) as BookingLink;
      } catch { decoded = undefined; }
    }
    const links = JSON.parse(localStorage.getItem('sava-booking-links') || '[]') as BookingLink[];
    this.link = decoded ?? links.find((item) => item.id === token);
  }
  submit(): void {
    if (!this.link || !this.guestName.trim() || !this.guestContact.trim()) return;
    const requests = JSON.parse(localStorage.getItem('sava-reservation-requests') || '[]') as unknown[];
    requests.unshift({ ...this.link, guestName: this.guestName.trim(), guestContact: this.guestContact.trim(), status: 'Pendente', submittedAt: new Date().toISOString() });
    localStorage.setItem('sava-reservation-requests', JSON.stringify(requests));
    this.sent = true;
  }
}
