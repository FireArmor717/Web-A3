import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api';

@Component({
  selector: 'page-edit-event',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-event.html',
  styleUrls: ['./edit-event.css']
})
export class EditEvent implements OnInit {
  id!: number;
  form: any = null;
  loading = true;
  message = '';
  submitting = false;

  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router) {}

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.api.getEventById(this.id).subscribe({
      next: data => { this.form = data; this.loading = false; },
      error: err => { this.message = 'Failed to load event.'; this.loading = false; }
    });
  }

  submit() {
    if (!this.form || !this.form.event_name) { this.message = 'Invalid form'; return; }
    this.submitting = true;
    this.api.updateEvent(this.id, this.form).subscribe({
      next: () => { this.submitting = false; alert('Event updated'); this.router.navigate(['/']); },
      error: err => { this.submitting = false; this.message = err?.error?.error || 'Update failed'; }
    });
  }
}
