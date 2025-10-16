import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { ApiService } from '../../services/api';

@Component({
  selector: 'page-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home implements OnInit {
  events: any[] = [];
  loading = true;
  error = '';

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit() {
    this.api.getEvents().subscribe({
      next: (data) => { this.events = data; this.loading = false; },
      error: (err) => { console.error(err); this.error = 'Failed to load events'; this.loading = false; }
    });
  }

  viewEvent(id: number) {
    this.router.navigate(['/event', id]);
  }
}
