import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { Carousel } from 'bootstrap';

@Component({
  selector: 'app-slider',
  template: `
    <div id="homeMainCarousel" class="carousel slide" data-bs-ride="carousel">
      <!-- Indicators -->
      <div class="carousel-indicators">
        <button type="button" data-bs-target="#homeMainCarousel" data-bs-slide-to="0" class="active"></button>
        <button type="button" data-bs-target="#homeMainCarousel" data-bs-slide-to="1"></button>
        <button type="button" data-bs-target="#homeMainCarousel" data-bs-slide-to="2"></button>
        <button type="button" data-bs-target="#homeMainCarousel" data-bs-slide-to="3"></button>
        <button type="button" data-bs-target="#homeMainCarousel" data-bs-slide-to="4"></button>
      </div>

      <!-- Slides -->
      <div class="carousel-inner">
        <div class="carousel-item active">
          <div class="slide-bg" style="background-image: url('assets/slider/slider1.jpg');"></div>
          <div class="min-vh-80">
            <div class="container">
              <h1 class="display-3 fw-bold text-white mb-4">Solutions d'hygiène professionnelle</h1>
              <p class="lead text-white-50 mb-5">Des produits de qualité pour un environnement sain et sécurisé</p>
              <a routerLink="/contact" class="btn btn-primary btn-lg me-3">Contactez-nous</a>
              <a routerLink="/services" class="btn btn-outline-light btn-lg">Nos services</a>
            </div>
          </div>
        </div>
        <!-- Ajoutez les autres slides de la même manière -->
      </div>

      <!-- Contrôles -->
      <button class="carousel-control-prev slider-nav-btn" type="button" data-bs-target="#homeMainCarousel" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Précédent</span>
      </button>
      <button class="carousel-control-next slider-nav-btn" type="button" data-bs-target="#homeMainCarousel" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Suivant</span>
      </button>
    </div>
  `
})
export class SliderComponent implements AfterViewInit, OnDestroy {
  private carousel: any;
  private intervalId: any;
  private readonly INTERVAL_DURATION = 4000; // 4 secondes

  ngAfterViewInit() {
    // Initialisation du carousel
    const carouselElement = document.getElementById('homeMainCarousel');
    if (carouselElement) {
      this.carousel = new Carousel(carouselElement, {
        interval: this.INTERVAL_DURATION,
        ride: 'carousel',
        wrap: true
      });
      
      // Démarrer le défilement automatique
      this.startAutoSlide();
      
      // Gérer la pause au survol
      carouselElement.addEventListener('mouseenter', () => this.pauseAutoSlide());
      carouselElement.addEventListener('mouseleave', () => this.startAutoSlide());
      
      // Gérer la pause au focus
      carouselElement.addEventListener('focusin', () => this.pauseAutoSlide());
      carouselElement.addEventListener('focusout', (e) => {
        if (!carouselElement.contains(e.relatedTarget as Node)) {
          this.startAutoSlide();
        }
      });
    }
  }
  
  ngOnDestroy() {
    this.pauseAutoSlide();
    if (this.carousel) {
      this.carousel.dispose();
    }
  }
  
  private startAutoSlide() {
    this.pauseAutoSlide(); // S'assurer qu'il n'y a pas d'intervalle en cours
    
    this.intervalId = setInterval(() => {
      if (this.carousel) {
        this.carousel.next();
      }
    }, this.INTERVAL_DURATION);
  }
  
  private pauseAutoSlide() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}
