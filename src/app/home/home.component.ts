import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  quote: string | undefined;
  isLoading = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.isLoading = true;
    // this.router.navigate(['/messages']).then(() => {
    //   this.isLoading = false;
    // })
  }
}
