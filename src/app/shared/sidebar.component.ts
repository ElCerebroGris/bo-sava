import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <aside class="sidebar flex h-full flex-col bg-[#162c27] text-white">
      <a routerLink="/dashboard" class="brand flex items-center gap-3 px-6 py-7" aria-label="Página inicial da Sava">
        <span class="brand-mark grid h-10 w-10 place-items-center rounded-xl bg-[#d5ed75] text-[#162c27]">
          <svg viewBox="0 0 32 32" class="h-6 w-6" fill="none" aria-hidden="true"><path d="M5 22.5 12.2 9l4.1 7.2 3.3-5.8L27 24H8.3" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/><circle cx="23.5" cy="8.5" r="2" fill="currentColor"/></svg>
        </span>
        <span><span class="block text-[19px] font-bold tracking-tight">sava<span class="text-[#d5ed75]">.</span></span><span class="block text-[10px] font-medium uppercase tracking-[.2em] text-white/45">portal de parceiros</span></span>
      </a>
      <div class="sidebar-navigation">
        <div class="px-6 pb-3 pt-5 text-[10px] font-semibold uppercase tracking-[.18em] text-white/35">Área de trabalho</div>
        <nav class="flex flex-col gap-1 px-3" aria-label="Navegação principal">
          <a routerLink="/dashboard" routerLinkActive="nav-active" class="nav-link"><span class="nav-icon">⌂</span>Visão geral</a>
          <a routerLink="/reservations" routerLinkActive="nav-active" class="nav-link"><span class="nav-icon">▤</span>Reservas<span class="ml-auto rounded-full bg-white/10 px-2 py-0.5 text-[10px]">12</span></a>
          <a routerLink="/properties" routerLinkActive="nav-active" class="nav-link"><span class="nav-icon">⌂</span>Alojamentos</a>
          <a routerLink="/guests" routerLinkActive="nav-active" class="nav-link"><span class="nav-icon">♧</span>Hóspedes</a>
        </nav>
        <div class="px-6 pb-3 pt-9 text-[10px] font-semibold uppercase tracking-[.18em] text-white/35">Gestão</div>
        <nav class="flex flex-col gap-1 px-3" aria-label="Navegação de gestão">
          <a routerLink="/analytics" routerLinkActive="nav-active" class="nav-link"><span class="nav-icon">▥</span>Análises</a>
          <a routerLink="/payments" routerLinkActive="nav-active" class="nav-link"><span class="nav-icon">◈</span>Pagamentos</a>
          <a routerLink="/settings" routerLinkActive="nav-active" class="nav-link"><span class="nav-icon">⚙</span>Definições</a>
        </nav>
      </div>
      <div class="mt-auto p-4">
        <div class="help-card rounded-2xl border border-white/10 bg-white/[.06] p-4">
          <span class="grid h-8 w-8 place-items-center rounded-lg bg-[#d5ed75] text-sm text-[#162c27]">✦</span>
          <p class="mt-3 text-sm font-semibold">Precisa de ajuda?</p><p class="mt-1 text-xs leading-5 text-white/50">A nossa equipa em Luanda está aqui para si.</p>
          <a href="mailto:parceiros@sava.ao" class="mt-3 inline-flex text-xs font-semibold text-[#d5ed75]">Falar com o suporte <span class="ml-1">↗</span></a>
        </div>
        <a routerLink="/login" class="mt-3 flex items-center gap-3 rounded-xl p-3 text-sm text-white/70 transition hover:bg-white/10"><span class="grid h-8 w-8 place-items-center rounded-full bg-white/10">↪</span>Terminar sessão</a>
      </div>
    </aside>
  `
})
export class SidebarComponent {}
