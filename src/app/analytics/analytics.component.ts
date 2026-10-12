import { Component } from '@angular/core';
import { SidebarComponent } from '../shared/sidebar.component';
import { ProfileMenuComponent } from '../shared/profile-menu.component';

@Component({ selector: 'app-analytics', standalone: true, imports: [SidebarComponent, ProfileMenuComponent], templateUrl: './analytics.component.html', styleUrl: './analytics.component.css' })
export class AnalyticsComponent {
  readonly months = ['Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out'];
  readonly bars = [48, 62, 55, 74, 67, 90];
}
