import { CommonModule, isPlatformBrowser } from "@angular/common";
import { Component, HostListener, Inject, OnInit, PLATFORM_ID } from "@angular/core";

@Component({
  selector: 'scroll-top-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './scroll-top-component.html',
  styleUrl: './scroll-top-component.css',
})

export class ScrollTopComponent implements OnInit {

  isBackToTopVisible = false;

  constructor(@Inject(PLATFORM_ID) private readonly platformId: Object) { }

  ngOnInit() {
    this.onWindowScroll();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (isPlatformBrowser(this.platformId)) {
      this.checkScroll();
    }
  }

  checkScroll() {
    if (isPlatformBrowser(this.platformId)) {
      const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      this.isBackToTopVisible = scrollPosition > 300;
    }
  }

  scrollToTop() {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }
}