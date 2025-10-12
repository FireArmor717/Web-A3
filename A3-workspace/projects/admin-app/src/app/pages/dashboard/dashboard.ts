import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api';

@Component({
  selector: 'page-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard implements OnInit {
  events: any[] = [];
  loading = true;
  error = '';

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.loading = true;
    this.api.getAllEvents().subscribe({
      next: data => { this.events = data || []; this.loading = false; },
      error: err => { this.error = err?.error?.error || 'Failed to load events.'; this.loading = false; }
    });
  }

  deleteEvent(id: number) {
    if (!confirm('Delete this event? This cannot be undone if there are no registrations.')) return;
    this.api.deleteEvent(id).subscribe({
      next: () => { alert('Event deleted'); this.load(); },
      error: (err) => {
        const message = err?.error?.error || 'Failed to delete event.';
        alert(message);
      }
    });
  }
}
