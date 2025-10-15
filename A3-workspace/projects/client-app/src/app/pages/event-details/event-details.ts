import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { ApiService } from '../../services/api';

@Component({
  selector: 'page-event-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './event-details.html',
  styleUrls: ['./event-details.css']
})
export class EventDetails implements OnInit {
  event: any = null;
  registrations: any[] = [];
  loading = true;
  error = '';

  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.api.getEvent(id).subscribe({
      next: (res) => {
        this.event = res;
        this.registrations = res.registrations || [];
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load event details';
        this.loading = false;
      }
    });
  }

  goHome() {
  this.router.navigate(['/']);
  }

  goRegister() {
    if (!this.event) return;
    this.router.navigate(['/register', this.event.event_id]);
  }
}
