import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api';

@Component({
  selector: 'page-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register {
  eventId!: number;
  name = '';
  email = '';
  tickets = 1;
  message = '';
  success = false;
  submitting = false;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private router: Router
  ) {
    this.eventId = Number(this.route.snapshot.paramMap.get('id'));
  }

  submit() {
    this.message = '';
    if (!this.name || !this.email || !this.tickets || this.tickets < 1) {
      this.message = 'Please fill all fields correctly.';
      this.success = false;
      return;
    }

    const payload = {
      event_id: this.eventId,
      registrant_name: this.name,
      registrant_email: this.email,
      num_tickets: this.tickets
    };

    this.submitting = true;
    this.api.registerEvent(payload).subscribe({
      next: () => {
        this.success = true;
        this.message = 'Registration successful! Redirecting...';
        this.submitting = false;
        setTimeout(() => this.router.navigate(['/event', this.eventId]), 1200);
      },
      error: () => {
        this.success = false;
        this.message = 'Registration failed. Try again.';
        this.submitting = false;
      }
    });
  }

  // ✅ 新增公共方法供模板调用
  cancel() {
    this.router.navigate(['/']);
  }
}
