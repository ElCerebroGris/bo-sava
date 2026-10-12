import { Component } from '@angular/core';
import { SidebarComponent } from '../shared/sidebar.component';
import { ProfileMenuComponent } from '../shared/profile-menu.component';

@Component({ selector: 'app-payments', standalone: true, imports: [SidebarComponent, ProfileMenuComponent], templateUrl: './payments.component.html', styleUrl: './payments.component.css' })
export class PaymentsComponent {
  readonly transactions = [
    { reference: 'RSV-2026-1042', guest: 'Ana Martins', property: 'Residência Baía Azul', date: '16 out. 2026', amount: 'Kz 420 000', status: 'A processar' },
    { reference: 'RSV-2026-1038', guest: 'João Manuel', property: 'Casa do Miradouro', date: '14 out. 2026', amount: 'Kz 248 000', status: 'Pago' },
    { reference: 'RSV-2026-1029', guest: 'Pedro Santos', property: 'Casa de Praia do Mussulo', date: '10 out. 2026', amount: 'Kz 675 000', status: 'Pago' },
  ];
}
