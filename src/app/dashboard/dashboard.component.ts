import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { SidebarComponent } from '../shared/sidebar.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SidebarComponent, FormsModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  period = 'Este mês';
  profileMenuOpen = false;
  constructor(private readonly router: Router) {}
  toggleProfileMenu(): void { this.profileMenuOpen = !this.profileMenuOpen; }
  logout(): void { this.profileMenuOpen = false; this.router.navigate(['/login']); }
  readonly bookings = [
    { initials: 'JM', color: 'bg-[#e5ebdc] text-[#4b654c]', name: 'João Manuel', property: 'Casa do Miradouro', dates: '14 out. – 18 out.', guests: '2 hóspedes', amount: 'Kz 248 000', status: 'Confirmada', statusStyle: 'bg-[#eaf4df] text-[#56743e]' },
    { initials: 'AM', color: 'bg-[#f3e6da] text-[#965f3c]', name: 'Ana Martins', property: 'Residência Baía Azul', dates: '16 out. – 20 out.', guests: '4 hóspedes', amount: 'Kz 420 000', status: 'Alojada', statusStyle: 'bg-[#e5f0f4] text-[#477080]' },
    { initials: 'PS', color: 'bg-[#e5e5f1] text-[#5d5b85]', name: 'Pedro Santos', property: 'Casa de Praia do Mussulo', dates: '18 out. – 23 out.', guests: '3 hóspedes', amount: 'Kz 675 000', status: 'Próxima', statusStyle: 'bg-[#f5eedc] text-[#8c7540]' },
    { initials: 'FC', color: 'bg-[#f0e5e9] text-[#90556d]', name: 'Filipa Costa', property: 'Casa do Miradouro', dates: '20 out. – 22 out.', guests: '2 hóspedes', amount: 'Kz 124 000', status: 'Confirmada', statusStyle: 'bg-[#eaf4df] text-[#56743e]' }
  ];
  readonly properties = [
    { name: 'Casa do Miradouro', location: 'Miramar, Luanda', image: 'photo-1600210492486-724fe5c67fb0', occupancy: '92%', rating: '4.92', bookings: '18 reservas' },
    { name: 'Residência Baía Azul', location: 'Ilha de Luanda', image: 'photo-1600607687939-ce8a6c25118c', occupancy: '78%', rating: '4.87', bookings: '14 reservas' },
    { name: 'Casa de Praia do Mussulo', location: 'Mussulo, Luanda', image: 'photo-1600566753086-00f18fb6b3ea', occupancy: '64%', rating: '4.98', bookings: '9 reservas' }
  ];
}
