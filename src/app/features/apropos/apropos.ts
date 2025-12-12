import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-apropos',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './apropos.html',
  styleUrl: './apropos.css',
})
export class Apropos {
  // Logique du composant à ajouter ici si nécessaire
}
