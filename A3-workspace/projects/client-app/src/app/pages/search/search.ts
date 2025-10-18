import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api';

@Component({
  selector: 'page-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search.html',
  styleUrls: ['./search.css']
})
export class Search {
  date = '';
  location = '';
  category = '';
  results: any[] = [];
  loading = false;
  message = '';

  constructor(private api: ApiService, private router: Router) {}

  doSearch() {
    this.loading = true;
    const params: any = {};
    if (this.date) params.date = this.date;
    if (this.location) params.location = this.location;
    if (this.category) params.category = this.category;

    this.api.searchEvents(params).subscribe({
      next: (res) => {
        this.results = res;
        this.message = res.length ? '' : 'No events found';
        this.loading = false;
      },
      error: () => {
        this.message = 'Search failed';
        this.loading = false;
      }
    });
  }

  clearFilters() {
    this.date = '';
    this.location = '';
    this.category = '';
    this.results = [];
    this.message = '';
  }

  viewEvent(id: number) {
    this.router.navigate(['/event', id]);
  }
}
