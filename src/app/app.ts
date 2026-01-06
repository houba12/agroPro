import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import { Footer } from './footer/footer';
import { ScrollTopComponent } from "./components/scroll-top/scroll-top-component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    Header,
    Footer,
    ScrollTopComponent
],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}
