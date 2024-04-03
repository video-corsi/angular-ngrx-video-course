// src/features/home/home.component.ts
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectTotal } from '../counter/store/counter.feature';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  template: `
    <p>
      home works! {{total()}}
    </p>
  `,
  styles: ``
})
export default class HomeComponent {
  store = inject(Store)
  total = this.store.selectSignal(selectTotal)
}
