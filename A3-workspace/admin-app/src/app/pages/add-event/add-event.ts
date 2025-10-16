import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api';

@Component({
  selector: 'page-add-event',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-event.html',
  styleUrl: './add-event.css'
})
export class AddEvent {
  event: any = {
    event_name: '',
    event_date: '',
    event_location: '',
    category_id: 1,
    org_id: 1,
    ticket_price: 0,
    goal_amount: 0,
    progress_amount: 0,
    event_description: ''
  };

  message = '';
  submitting = false;

  constructor(private api: ApiService, private router: Router) {}

  save() {
    this.message = '';

    // 前端校验
    if (!this.event.event_name || !this.event.event_date || !this.event.event_location) {
      this.message = 'Please fill in all required fields.';
      return;
    }

    this.submitting = true;
    this.api.addEvent(this.event).subscribe({
      next: () => {
        this.message = '✅ Event created successfully!';
        this.submitting = false;
        setTimeout(() => this.router.navigate(['/dashboard']), 1200);
      },
      error: (err) => {
        this.message = err.error?.error || '❌ Failed to create event.';
        this.submitting = false;
      }
    });
  }

  cancel() {
    this.router.navigate(['/dashboard']);
  }
}
