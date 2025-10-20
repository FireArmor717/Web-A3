import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { AddEvent } from './pages/add-event/add-event';
import { EditEvent } from './pages/edit-event/edit-event';

export const routes: Routes = [
  { path: '', component: Dashboard },
  { path: 'add', component: AddEvent },
  { path: 'edit/:id', component: EditEvent },
  { path: '**', redirectTo: '' }
];
