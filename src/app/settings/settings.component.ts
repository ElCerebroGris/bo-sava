import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../shared/sidebar.component';
import { ProfileMenuComponent } from '../shared/profile-menu.component';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [SidebarComponent, ProfileMenuComponent, FormsModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
})
export class SettingsComponent {
  notice = '';
  settings = {
    name: 'Marta Costa',
    email: 'marta@sava.ao',
    bookingNotifications: true,
    paymentNotifications: true,
    language: 'Português',
  };
  constructor() {
    const savedSettings = localStorage.getItem('sava-settings');
    if (savedSettings)
      this.settings = { ...this.settings, ...JSON.parse(savedSettings) };
  }
  saveSettings(): void {
    localStorage.setItem('sava-settings', JSON.stringify(this.settings));
    this.notice = 'Definições guardadas neste dispositivo.';
    window.setTimeout(() => (this.notice = ''), 3000);
  }
}
