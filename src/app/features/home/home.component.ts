// src/features/home/home.component.ts
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  template: `
    <p>
      home works! 
    </p>
  `,
  styles: ``
})
export default class HomeComponent {
  store = inject(Store)
}
