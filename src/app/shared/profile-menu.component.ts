import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-menu',
  standalone: true,
  template: `
    <div class="profile-menu-wrap relative border-l border-[#e9ece6] pl-5">
      <button
        type="button"
        (click)="toggle()"
        [attr.aria-expanded]="isOpen"
        aria-haspopup="menu"
        aria-label="Abrir menu do perfil"
        class="flex items-center gap-3 rounded-xl py-1 text-left hover:opacity-80"
      >
        <span
          class="grid h-9 w-9 place-items-center rounded-full bg-[#dce8d6] text-xs font-bold text-[#42624b]"
          >MC</span
        >
        <span class="hidden sm:block"
          ><span class="block text-xs font-semibold">Marta Costa</span
          ><span class="mt-0.5 block text-[11px] text-[#89948d]"
            >Gestora de alojamentos</span
          ></span
        >
        <span class="text-xs text-[#89948d]">⌄</span>
      </button>
      @if (isOpen) {
        <div
          role="menu"
          class="profile-dropdown absolute right-0 top-full z-30 mt-3 w-52 overflow-hidden rounded-xl border border-[#e9ece6] bg-white p-1.5 shadow-xl"
        >
          <div class="border-b border-[#eef0ec] px-3 py-2.5">
            <p class="text-xs font-semibold">Marta Costa</p>
            <p class="mt-1 truncate text-[11px] text-[#89948d]">
              marta&#64;sava.ao
            </p>
          </div>
          <button
            type="button"
            role="menuitem"
            (click)="logout()"
            class="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-xs font-medium text-[#7d5149] transition hover:bg-[#fbf3f1]"
          >
            ↪ &nbsp; Terminar sessão
          </button>
        </div>
      }
    </div>
  `,
})
export class ProfileMenuComponent {
  isOpen = false;
  constructor(private readonly router: Router) {}
  toggle(): void {
    this.isOpen = !this.isOpen;
  }
  logout(): void {
    this.isOpen = false;
    this.router.navigate(['/login']);
  }
}
