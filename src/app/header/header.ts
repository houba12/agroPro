import { Component, HostListener } from '@angular/core';
import { NgClass } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgClass],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  isScrolled = false;

  @HostListener('window:scroll')
  onWindowScroll() {
    const offset = window.scrollY || document.documentElement.scrollTop || 0;
    this.isScrolled = offset > 10;
  }
}
