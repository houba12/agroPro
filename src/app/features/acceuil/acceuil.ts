import { Component, OnInit, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import AOS from 'aos';
import 'aos/dist/aos.css';

@Component({
  selector: 'app-acceuil',
  standalone: true,
  imports: [CommonModule, MatProgressBarModule],
  templateUrl: './acceuil.html',
  styleUrl: './acceuil.css',
})
export class Acceuil implements OnInit, AfterViewInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  // Gère le survol d'une carte
  onCardHover(event: Event): void {
    const card = event.currentTarget as HTMLElement;
    const description = card.querySelector('.card-description') as HTMLElement;
    if (description) {
      description.style.maxHeight = '200px';
      description.style.opacity = '1';
      description.style.margin = '15px 0';
    }
  }

  // Gère la sortie de la souris d'une carte
  onCardLeave(event: Event): void {
    const card = event.currentTarget as HTMLElement;
    const description = card.querySelector('.card-description') as HTMLElement;
    if (description) {
      description.style.maxHeight = '0';
      description.style.opacity = '0';
      description.style.margin = '0';
    }
  }

  // Variables pour la lightbox
  showLightbox = false;
  selectedImage: any = null;
  currentIndex = 0;
  lightboxImages: any[] = [];

  // Ouvrir la lightbox
  // Tableau des produits de la galerie
  galleryImages = [
    // Hygiène De Surface
    {
      src: 'assets/portfolio/1.jpg',
      alt: 'ARVO 21 SR',
      title: 'ARVO 21 SR',
      category: 'hygiene-surface',
      description: 'Désinfectant professionnel multi-surfaces'
    },
    {
      src: 'assets/portfolio/2.jpg',
      alt: 'BASO RENOV',
      title: 'BASO RENOV',
      category: 'hygiene-surface',
      description: 'Nettoyant et dégraissant haute performance'
    },
    {
      src: 'assets/portfolio/3.jpg',
      alt: 'BASO BIONIL',
      title: 'BASO BIONIL',
      category: 'hygiene-surface',
      description: 'Désinfectant et détergent enzymatique'
    },
    {
      src: 'assets/portfolio/4.jpg',
      alt: 'BASO AUTO CLEAN S',
      title: 'BASO AUTO CLEAN S',
      category: 'hygiene-surface',
      description: 'Nettoyant désinfectant pour surfaces'
    },
    {
      src: 'assets/portfolio/5.jpg',
      alt: 'INDAL MTA',
      title: 'INDAL MTA',
      category: 'hygiene-surface',
      description: 'Détergent désinfectant concentré'
    },
    
    // Hygiène Des Mains
    {
      src: 'assets/portfolio/6.jpg',
      alt: 'ARVO 21 SR Gel',
      title: 'ARVO 21 SR GEL',
      category: 'hygiene-mains',
      description: 'Gel hydroalcoolique désinfectant pour les mains'
    },
    
    // Hygiène Des Circuits
    {
      src: 'assets/portfolio/7.jpg',
      alt: 'INDAL PERACID 50',
      title: 'INDAL PERACID 50',
      category: 'hygiene-circuits',
      description: 'Désinfectant concentré pour circuits'
    },
    {
      src: 'assets/portfolio/8.jpg',
      alt: 'INDAL MSP',
      title: 'INDAL MSP',
      category: 'hygiene-circuits',
      description: 'Détergent désinfectant pour circuits médicaux'
    },
    
    // Hygiène D'élevage
    {
      src: 'assets/portfolio/9.jpg',
      alt: 'ARVO BVF',
      title: 'ARVO BVF',
      category: 'hygiene-elevage',
      description: 'Solution d\'hygiène pour élevages'
    },
    
    // Hygiène D'ambiance
    {
      src: 'assets/portfolio/10.jpg',
      alt: 'INDAL OXY DVA ECOCERT',
      title: 'INDAL OXY DVA ECOCERT',
      category: 'hygiene-ambiance',
      description: 'Désinfectant d\'ambiance écologique certifié'
    }
  ];
  
  // Catégories personnalisées avec libellés en français
  categories = [
    { id: 'tous', name: 'Tout' },
    { id: 'hygiene-surface', name: 'Hygiène De Surface' },
    { id: 'hygiene-mains', name: 'Hygiène Des Mains' },
    { id: 'hygiene-circuits', name: 'Hygiène Des Circuits' },
    { id: 'hygiene-elevage', name: 'Hygiène D\'élevage' },
    { id: 'hygiene-ambiance', name: 'Hygiène D\'ambiance' }
  ];

  // Catégorie active
  activeCategory = 'tous';

  // Filtrer les images par catégorie
  get filteredImages() {
    if (!this.activeCategory || this.activeCategory === 'tous') {
      return this.galleryImages;
    }
    return this.galleryImages.filter(img => img.category === this.activeCategory);
  }

  // Changer la catégorie active
  setActiveCategory(categoryId: string) {
    this.activeCategory = categoryId;
    // Faire défiler vers la section galerie lors du changement de catégorie
    setTimeout(() => {
      const element = document.getElementById('gallery');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  }

  // Ouvrir la lightbox
  openLightbox(image: any, index: number) {
    this.lightboxImages = [...this.galleryImages];
    this.currentIndex = this.lightboxImages.findIndex(img => img.src === image.src);
    this.selectedImage = this.lightboxImages[this.currentIndex];
    this.showLightbox = true;
    document.body.style.overflow = 'hidden';
  }

  // Fermer la lightbox
  closeLightbox() {
    this.showLightbox = false;
    document.body.style.overflow = 'auto';
  }

  // Image précédente
  prevImage() {
    this.currentIndex = (this.currentIndex - 1 + this.lightboxImages.length) % this.lightboxImages.length;
    this.selectedImage = this.lightboxImages[this.currentIndex];
  }

  // Image suivante
  nextImage() {
    this.currentIndex = (this.currentIndex + 1) % this.lightboxImages.length;
    this.selectedImage = this.lightboxImages[this.currentIndex];
  }

  // Navigation au clavier
  onKeydown(event: KeyboardEvent) {
    if (this.showLightbox) {
      if (event.key === 'Escape') {
        this.closeLightbox();
      } else if (event.key === 'ArrowLeft') {
        this.prevImage();
      } else if (event.key === 'ArrowRight') {
        this.nextImage();
      }
    }
  }

  // Ouvrir la popup d'image
  openImagePopup(image: any) {
    this.selectedImage = image;
    document.body.style.overflow = 'hidden';
  }

  // Fermer la popup d'image
  closeImagePopup() {
    this.selectedImage = null;
    document.body.style.overflow = 'auto';
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
      });
    }
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Animation des compteurs
      this.animateCounters();
      
      // Animation des cartes au survol
      this.initHoverEffects();
    }
  }

  private animateCounters() {
    const counterElements = document.querySelectorAll('.counter-value') as NodeListOf<HTMLElement>;
    const speed = 200; // La vitesse de l'animation

    counterElements.forEach((counter: HTMLElement) => {
      const target = parseInt(counter.getAttribute('data-target') || '0', 10);
      const count = parseInt(counter.textContent || '0', 10);
      const increment = target / speed;

      const updateCounter = () => {
        const currentCount = parseInt(counter.textContent || '0', 10);
        if (currentCount < target) {
          counter.textContent = Math.ceil(currentCount + increment).toString();
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target.toString();
        }
      };

      updateCounter();
    });
  }

  private initHoverEffects() {
    const cards = document.querySelectorAll('.feature-card, .service-card, .stat-item') as NodeListOf<HTMLElement>;
    
    const handleMouseMove = (e: MouseEvent) => {
      const card = e.currentTarget as HTMLElement;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    };

    cards.forEach(card => {
      card.addEventListener('mousemove', handleMouseMove as EventListener);
    });
  }
}
