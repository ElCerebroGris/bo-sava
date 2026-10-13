import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SidebarComponent } from '../shared/sidebar.component';

type ListingStatus = 'Publicado' | 'Rascunho';
interface PropertyDraft {
  id: string;
  name: string;
  type: string;
  province: string;
  city: string;
  neighborhood: string;
  address: string;
  bedrooms: number;
  bathrooms: number;
  guests: number;
  area: number;
  floor: string;
  amenities: string[];
  photos: string[];
  nightlyRate: number;
  description: string;
  status: ListingStatus;
}
type StoredProperty = Partial<Omit<PropertyDraft, 'photos'>> & {
  name: string;
  photos?: string | string[];
};

@Component({
  selector: 'app-property-detail',
  standalone: true,
  imports: [SidebarComponent, FormsModule, RouterLink],
  templateUrl: './property-detail.component.html',
  styleUrl: './property-detail.component.css',
})
export class PropertyDetailComponent {
  property?: PropertyDraft;
  notice = '';
  readonly amenityOptions = [
    'Wi-Fi',
    'Ar condicionado',
    'Cozinha equipada',
    'Estacionamento',
    'Piscina',
    'TV',
    'Água quente',
    'Segurança 24h',
    'Vista mar',
    'Varanda',
    'Jardim',
    'Lavandaria',
  ];

  constructor(route: ActivatedRoute) {
    const id = route.snapshot.paramMap.get('id') || '';
    const saved = JSON.parse(
      localStorage.getItem('sava-properties') || '[]',
    ) as StoredProperty[];
    const stored = saved.find((item) => this.propertyId(item.name) === id);
    if (stored) {
      this.property = {
        id,
        name: stored.name,
        type: stored.type || 'Apartamento',
        province: stored.province || 'Luanda',
        city: stored.city || '',
        neighborhood: stored.neighborhood || '',
        address: stored.address || '',
        bedrooms: stored.bedrooms || 1,
        bathrooms: stored.bathrooms || 1,
        guests: stored.guests || 2,
        area: stored.area || 0,
        floor: stored.floor || '',
        amenities: stored.amenities || [],
        photos: Array.isArray(stored.photos) ? stored.photos : [],
        nightlyRate: stored.nightlyRate || 0,
        description: stored.description || '',
        status: stored.status || 'Rascunho',
      };
    } else {
      const samples: PropertyDraft[] = [
        {
          id: 'casa-do-miradouro',
          name: 'Casa do Miradouro',
          type: 'Casa',
          province: 'Luanda',
          city: 'Luanda',
          neighborhood: 'Miramar',
          address: '',
          bedrooms: 3,
          bathrooms: 2,
          guests: 6,
          area: 180,
          floor: '',
          amenities: ['Wi-Fi', 'Piscina', 'Vista mar'],
          photos: [],
          nightlyRate: 62000,
          description: 'Uma casa acolhedora com vista sobre a cidade.',
          status: 'Publicado',
        },
        {
          id: 'residencia-baia-azul',
          name: 'Residência Baía Azul',
          type: 'Apartamento',
          province: 'Luanda',
          city: 'Luanda',
          neighborhood: 'Ilha de Luanda',
          address: '',
          bedrooms: 2,
          bathrooms: 2,
          guests: 4,
          area: 110,
          floor: '4.º andar',
          amenities: ['Wi-Fi', 'Ar condicionado', 'Vista mar'],
          photos: [],
          nightlyRate: 105000,
          description: 'Apartamento confortável perto da marginal.',
          status: 'Publicado',
        },
        {
          id: 'casa-de-praia-do-mussulo',
          name: 'Casa de Praia do Mussulo',
          type: 'Casa',
          province: 'Luanda',
          city: 'Luanda',
          neighborhood: 'Mussulo',
          address: '',
          bedrooms: 4,
          bathrooms: 3,
          guests: 8,
          area: 220,
          floor: '',
          amenities: ['Wi-Fi', 'Piscina', 'Cozinha equipada'],
          photos: [],
          nightlyRate: 150000,
          description: 'Casa de praia ideal para estadias em família.',
          status: 'Publicado',
        },
        {
          id: 'refugio-da-ilha',
          name: 'Refúgio da Ilha',
          type: 'Apartamento',
          province: 'Luanda',
          city: 'Luanda',
          neighborhood: 'Ilha de Luanda',
          address: '',
          bedrooms: 2,
          bathrooms: 1,
          guests: 4,
          area: 85,
          floor: '2.º andar',
          amenities: ['Wi-Fi', 'Varanda'],
          photos: [],
          nightlyRate: 85000,
          description: '',
          status: 'Rascunho',
        },
      ];
      this.property = samples.find((item) => item.id === id);
    }
  }

  toggleAmenity(amenity: string): void {
    if (!this.property) return;
    this.property.amenities = this.property.amenities.includes(amenity)
      ? this.property.amenities.filter((item) => item !== amenity)
      : [...this.property.amenities, amenity];
  }

  async addPhotos(event: Event): Promise<void> {
    if (!this.property) return;
    const input = event.target as HTMLInputElement;
    const files = Array.from(input.files || []).filter((file) =>
      file.type.startsWith('image/'),
    );
    for (const file of files) {
      try {
        const dataUrl = await this.readPhoto(file);
        this.property.photos.push(await this.resizePhoto(dataUrl));
      } catch {
        this.notice = 'Não foi possível carregar uma das imagens.';
      }
    }
    input.value = '';
  }

  removePhoto(index: number): void {
    this.property?.photos.splice(index, 1);
  }

  private readPhoto(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () =>
        typeof reader.result === 'string' ? resolve(reader.result) : reject();
      reader.onerror = () => reject();
      reader.readAsDataURL(file);
    });
  }

  private resizePhoto(dataUrl: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => {
        const scale = Math.min(1, 1200 / Math.max(image.width, image.height));
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(image.width * scale);
        canvas.height = Math.round(image.height * scale);
        const context = canvas.getContext('2d');
        if (!context) return reject();
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/jpeg', 0.75));
      };
      image.onerror = () => reject();
      image.src = dataUrl;
    });
  }

  save(): void {
    if (
      !this.property?.name.trim() ||
      !this.property.city.trim() ||
      !this.property.nightlyRate
    ) {
      this.notice = 'Preencha o nome, a cidade e o preço por noite.';
      return;
    }
    const saved = JSON.parse(
      localStorage.getItem('sava-properties') || '[]',
    ) as Array<PropertyDraft & { createdAt?: string }>;
    const entry = { ...this.property, createdAt: new Date().toISOString() };
    const index = saved.findIndex(
      (item) => this.propertyId(item.name) === this.property?.id,
    );
    if (index >= 0) saved[index] = { ...saved[index], ...entry };
    else saved.unshift(entry);
    localStorage.setItem('sava-properties', JSON.stringify(saved));
    this.notice = 'Alterações guardadas neste dispositivo.';
  }

  private propertyId(name: string): string {
    return name
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }
}
