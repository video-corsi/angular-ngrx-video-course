// core/store/counter/counter.feature.ts
import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { CounterActions } from './counter.actions';

export interface CounterState {
  value: number
  itemsInBox: number
}

const initialState: CounterState = { value: 0, itemsInBox: 12 }

export const counterFeature = createFeature({
  name: 'counter',
  reducer: createReducer(
    initialState,
    // NEW
    on(CounterActions.updateItemsInBox, (state, action) => ({ ...state, itemsInBox: action.value })),
    on(CounterActions.increment, (state) => ({ ...state, value: state.value + 1 })),
    on(CounterActions.reset, (state) => ({ ...state, value: 0 })),
    on(CounterActions.decrement, (state, action) => {
      const newValue = state.value - action.value
      return {
        ...state,
        value: newValue < 0 ? 0 : newValue
      }
    }),
  ),
  extraSelectors: ({ selectValue, selectItemsInBox }) => ({
    selectTotal: createSelector(
      selectValue,
      selectItemsInBox,
      (value, itemsInBox) => value * itemsInBox
    )
  })
})

export const {
  selectValue,
  selectItemsInBox,
  selectTotal
} = counterFeature;

