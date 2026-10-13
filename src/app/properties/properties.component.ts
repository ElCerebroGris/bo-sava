import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarComponent } from '../shared/sidebar.component';
import { RouterLink } from '@angular/router';

type PropertyStatus = 'Publicado' | 'Rascunho';
interface PropertyListing {
  name: string;
  location: string;
  image: string;
  status: PropertyStatus;
  rating: string;
  reviews: number;
  occupancy: string;
  bookings: number;
  nightlyRate: string;
  kind: string;
}

@Component({
  selector: 'app-properties',
  standalone: true,
  imports: [SidebarComponent, RouterLink],
  templateUrl: './properties.component.html',
  styleUrl: './properties.component.css'
})
export class PropertiesComponent {
  searchTerm = '';
  activeFilter: 'Todos' | PropertyStatus = 'Todos';
  profileMenuOpen = false;
  notice = '';

  readonly filters: Array<'Todos' | PropertyStatus> = ['Todos', 'Publicado', 'Rascunho'];
  properties: PropertyListing[] = [
    { name: 'Casa do Miradouro', location: 'Miramar, Luanda', image: 'photo-1600210492486-724fe5c67fb0', status: 'Publicado', rating: '4,92', reviews: 48, occupancy: '92%', bookings: 18, nightlyRate: 'Kz 62 000', kind: 'Moradia inteira' },
    { name: 'Residência Baía Azul', location: 'Ilha de Luanda', image: 'photo-1600607687939-ce8a6c25118c', status: 'Publicado', rating: '4,87', reviews: 36, occupancy: '78%', bookings: 14, nightlyRate: 'Kz 105 000', kind: 'Apartamento' },
    { name: 'Casa de Praia do Mussulo', location: 'Mussulo, Luanda', image: 'photo-1600566753086-00f18fb6b3ea', status: 'Publicado', rating: '4,98', reviews: 44, occupancy: '64%', bookings: 9, nightlyRate: 'Kz 150 000', kind: 'Casa de praia' },
    { name: 'Refúgio da Ilha', location: 'Ilha de Luanda', image: 'photo-1600607687920-4e2a09cf159d', status: 'Rascunho', rating: '—', reviews: 0, occupancy: '—', bookings: 0, nightlyRate: 'Kz 85 000', kind: 'Apartamento' }
  ];

  constructor(private readonly router: Router) {
    const state = this.router.getCurrentNavigation()?.extras.state ?? history.state;
    this.notice = state['notice'] || '';
    const saved = JSON.parse(localStorage.getItem('sava-properties') || '[]') as Array<{ name: string; type: string; city: string; neighborhood: string; nightlyRate: number; status: PropertyStatus }>;
    for (const item of saved) {
      const existing = this.properties.find((property) => property.name === item.name);
      const updated = { name: item.name, location: [item.neighborhood, item.city].filter(Boolean).join(', '), image: 'photo-1600210492486-724fe5c67fb0', status: item.status, rating: '—', reviews: 0, occupancy: '—', bookings: 0, nightlyRate: item.nightlyRate ? ('Kz ' + item.nightlyRate.toLocaleString('pt-AO')) : 'A definir', kind: item.type };
      if (existing) Object.assign(existing, updated); else this.properties.unshift(updated);
    }
  }

  get filteredProperties(): PropertyListing[] {
    const query = this.searchTerm.trim().toLocaleLowerCase('pt-AO');
    return this.properties.filter((property) => {
      const matchesFilter = this.activeFilter === 'Todos' || property.status === this.activeFilter;
      const matchesSearch = !query || `${property.name} ${property.location}`.toLocaleLowerCase('pt-AO').includes(query);
      return matchesFilter && matchesSearch;
    });
  }

  get publishedCount(): number { return this.properties.filter((property) => property.status === 'Publicado').length; }
  get draftCount(): number { return this.properties.filter((property) => property.status === 'Rascunho').length; }
  toggleProfileMenu(): void { this.profileMenuOpen = !this.profileMenuOpen; }
  logout(): void { this.router.navigate(['/login']); }
  setFilter(filter: 'Todos' | PropertyStatus): void { this.activeFilter = filter; }

  toggleStatus(property: PropertyListing): void {
    property.status = property.status === 'Publicado' ? 'Rascunho' : 'Publicado';
    this.notice = property.status === 'Publicado' ? 'Alojamento publicado.' : 'Alojamento colocado em rascunho.';
    this.clearNotice();
  }

  createProperty(): void { this.router.navigate(['/properties/new']); }
  propertyId(property: PropertyListing): string { return property.name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }

  private clearNotice(): void {
    window.setTimeout(() => this.notice = '', 3000);
  }
}
