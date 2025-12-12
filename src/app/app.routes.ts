import { Routes } from '@angular/router';
import { Contact } from './features/contact/contact';
import { Services } from './features/services/services';
import { Apropos } from './features/apropos/apropos';
import { Produits } from './features/produits/produits';
import { Acceuil } from './features/acceuil/acceuil';

export const routes: Routes = [
  { path: 'acceuil', component: Acceuil },
  { path: 'contact', component: Contact },
  { path: 'services', component: Services },
  { path: 'apropos', component: Apropos },
  { path: 'produits', component: Produits },
  { path: '', redirectTo: 'acceuil', pathMatch: 'full' },
  { path: '**', redirectTo: 'acceuil' }
];
