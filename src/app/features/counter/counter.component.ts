// src/features/counter/counter.component.ts
import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { CounterActions } from '../../core/store/counter/counter.actions';
import { selectValue, selectItemsInBox, selectTotal } from '../../core/store/counter/counter.feature';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [
    AsyncPipe
  ],
  template: `
    <div>qty: {{counter()}}</div>
    <div>item in box {{itemsInBox()}}</div>
    <div>total: {{total()}}</div>
    <br>
    <button (click)="dec()" class="btn">-</button>
    <button (click)="inc()" class="btn">+</button>
    <button (click)="reset()" class="btn">RESET</button>
    <button (click)="updateItemsPerBox(5)" class="btn">box 5</button>
    <button (click)="updateItemsPerBox(10)" class="btn">box 10</button>
  `,
})
export default class CounterComponent {
  store = inject(Store)
  counter = this.store.selectSignal(selectValue)
  itemsInBox = this.store.selectSignal(selectItemsInBox)
  total = this.store.selectSignal(selectTotal)

  updateItemsPerBox(value: number) {
    // NEW
    this.store.dispatch(CounterActions.updateItemsInBox({ value }))
  }
  inc() {
    this.store.dispatch(CounterActions.increment())
  }

  dec() {
    // UPDATED
    this.store.dispatch(CounterActions.decrement({ value: 1}))
  }

  reset() {
    this.store.dispatch(CounterActions.reset())
  }
}
