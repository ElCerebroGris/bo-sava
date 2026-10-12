import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { SidebarComponent } from '../shared/sidebar.component';

type PropertyType = 'Apartamento' | 'Casa';
type ListingDraft = { type: PropertyType; name: string; province: string; city: string; neighborhood: string; address: string; bedrooms: number; bathrooms: number; guests: number; area: number; floor: string; amenities: string[]; photos: string; nightlyRate: number; description: string };

@Component({
  selector: 'app-property-create', standalone: true, imports: [SidebarComponent, FormsModule, RouterLink],
  templateUrl: './property-create.component.html', styleUrl: './property-create.component.css'
})
export class PropertyCreateComponent {
  step = 1;
  notice = '';
  readonly steps = ['Tipo', 'Detalhes', 'Localização', 'Comodidades', 'Fotos', 'Preço e publicação'];
  readonly amenitiesList = ['Wi-Fi', 'Ar condicionado', 'Cozinha equipada', 'Estacionamento', 'Piscina', 'TV', 'Água quente', 'Segurança 24h', 'Vista mar', 'Varanda', 'Jardim', 'Lavandaria'];
  draft: ListingDraft = { type: 'Apartamento', name: '', province: 'Luanda', city: '', neighborhood: '', address: '', bedrooms: 1, bathrooms: 1, guests: 2, area: 0, floor: '', amenities: [], photos: '', nightlyRate: 0, description: '' };
Math: any;

  constructor(private readonly router: Router) {}
  get isHouse(): boolean { return this.draft.type === 'Casa'; }
  selectType(type: PropertyType): void { this.draft.type = type; }
  toggleAmenity(value: string): void { this.draft.amenities = this.draft.amenities.includes(value) ? this.draft.amenities.filter((item) => item !== value) : [...this.draft.amenities, value]; }
  next(): void { if (this.step < this.steps.length) this.step++; }
  back(): void { if (this.step > 1) this.step--; }
  saveDraft(): void { this.persist('Rascunho'); }
  publish(): void { this.persist('Publicado'); }
  private persist(status: 'Rascunho' | 'Publicado'): void {
    if (!this.draft.name.trim() || !this.draft.city.trim() || !this.draft.nightlyRate) { this.notice = 'Preencha o nome, a cidade e o preço por noite antes de continuar.'; return; }
    const saved = JSON.parse(localStorage.getItem('sava-properties') || '[]') as Array<Record<string, unknown>>;
    saved.unshift({ ...this.draft, status, createdAt: new Date().toISOString() });
    localStorage.setItem('sava-properties', JSON.stringify(saved));
    this.router.navigate(['/properties'], { state: { notice: status === 'Publicado' ? 'Alojamento publicado.' : 'Alojamento guardado como rascunho.' } });
  }
}
