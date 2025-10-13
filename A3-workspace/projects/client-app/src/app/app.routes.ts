import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Search } from './pages/search/search';
import { EventDetails } from './pages/event-details/event-details';
import { Register } from './pages/register/register';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'search', component: Search },
  { path: 'event/:id', component: EventDetails },
  { path: 'register/:id', component: Register },
  { path: '**', redirectTo: '' }
];
