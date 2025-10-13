import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  title = 'Harmony Charity Events';
  constructor(private router: Router) {}

  goHome() {
    this.router.navigate(['/']);
  }
}
