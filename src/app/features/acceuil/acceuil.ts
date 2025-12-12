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
  // Variables pour la lightbox
  showLightbox = false;
  selectedImage: any = null;
  currentIndex = 0;
  lightboxImages: any[] = [];

  // Ouvrir la lightbox
  // Tableau des images de la galerie
  galleryImages = [
    {
      src: 'assets/portfolio/1.jpg',
      alt: 'Produit d\'hygiène professionnelle',
      title: 'Produits d\'hygiène',
      category: 'hygiene',
      description: 'Gamme complète de produits d\'hygiène professionnelle'
    },
    {
      src: 'assets/portfolio/2.jpg',
      alt: 'Nettoyage industriel',
      title: 'Nettoyage industriel',
      category: 'nettoyage',
      description: 'Solutions de nettoyage pour l\'industrie'
    },
    {
      src: 'assets/portfolio/3.jpg',
      alt: 'Matériel professionnel',
      title: 'Équipements',
      category: 'equipement',
      description: 'Matériel professionnel de qualité supérieure'
    },
    {
      src: 'assets/portfolio/4.jpg',
      alt: 'Produits d\'entretien',
      title: 'Entretien',
      category: 'entretien',
      description: 'Produits d\'entretien professionnels'
    },
    {
      src: 'assets/portfolio/5.jpg',
      alt: 'Hygiène alimentaire',
      title: 'Alimentaire',
      category: 'alimentaire',
      description: 'Produits adaptés à l\'industrie alimentaire'
    },
    {
      src: 'assets/portfolio/6.jpg',
      alt: 'Matériel de protection',
      title: 'Protection',
      category: 'protection',
      description: 'Équipements de protection individuelle'
    },
    {
      src: 'assets/blog/2.jpg',
      alt: 'Formation professionnelle',
      title: 'Formation',
      category: 'formation',
      description: 'Sessions de formation professionnelle'
    },
    {
      src: 'assets/blog/4.jpg',
      alt: 'Solutions sur mesure',
      title: 'Solutions sur mesure',
      category: 'solutions',
      description: 'Des solutions adaptées à vos besoins spécifiques'
    }
  ];

  // Catégories uniques pour le filtrage
  categories = ['Tous', ...new Set(this.galleryImages.map(img => img.category))];
  
  // Catégorie active
  activeCategory = 'Tous';

  // Filtrer les images par catégorie
  get filteredImages() {
    if (this.activeCategory === 'Tous') {
      return this.galleryImages;
    }
    return this.galleryImages.filter(img => img.category === this.activeCategory);
  }

  // Changer la catégorie active
  setActiveCategory(category: string) {
    this.activeCategory = category;
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
